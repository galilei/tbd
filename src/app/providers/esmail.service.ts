import { Injectable } from '@angular/core';
import { MailService } from './mail.service';
import { ESService } from './es.service';
import { Observable, Subscriber } from 'rxjs';
import * as _ from 'lodash';
import { Scheduler } from 'rxjs/Scheduler';

class EsObservable<T> extends Observable<T> {
  private client: ESService;

  private index: string;
  private type: string;
  private query: string;

  private from: number = 0;
  private size: number = null;

  constructor(client, index, type, query, scheduler) {
    super(scheduler);
    this.client = client;
    this.index = index;
    this.type = type;
    this.query = query;
  }

  static create<T>(client, index, type, query, scheduler?: Scheduler): Observable<T> {
    return new EsObservable<T>(client, index, type, query, scheduler);
  }

  skip = function<T>(this: EsObservable<T>, count: number): EsObservable<T> {
    this.from = count;
    return this;
  }

  take = function<T>(this: EsObservable<T>, count: number): EsObservable<T> {
    this.size = count;
    return this;
  }

  public _subscribe(subscriber: Subscriber<any>) {
    this.client.search({
      index: this.index,
      type: this.type,
      from: this.from,
      size: this.size,
      sort: ['date:desc'],
      q: this.query ? this.query : null
    }, function (error, response) {
      console.log(response)
      if (error) {
        subscriber.error(error);
      } else {
        response.hits.hits.forEach(function (hit) {
          subscriber.next(_.merge({total: response.hits.total}, hit._source));
        });
      }

      subscriber.complete();

    });
  }
}

@Injectable()
export class ESMailService extends MailService {
  readonly mailIndex = 'mail';

  readonly mailType = 'mail';

  constructor(private client: ESService) {
    super();
  }

  save(mail, read = false) {
    this.client.index({
      requestTimeout: 1000,
      // opType: 'create',
      index: this.mailIndex,
      type: this.mailType,
      id: mail.messageId,
      body: _.merge({
        read: read,
      }, mail)
    }, function (error) {
      if (error) {
        console.trace('Error saving email', error);
      } else {
        console.log('Saved');
      }
    });
  }

  getByTag(tag: string) {
    return EsObservable.create(this.client, this.mailIndex, this.mailType, tag ? `tags:"${tag}"` : "");
  }

  get(id) {
    const me = this;
    return Observable.create(function (observer) {
      me.client.get({
        index: me.mailIndex,
        type: me.mailType,
        id: id
      }, function (error, response) {
        if (error) {
          observer.error(error);
        } else {
          observer.next(response._source);
        }

        observer.complete();
      });
    });
  }

  getTags() {
    const me = this;
    return Observable.create(function (observer) {
      me.client.search({
        index: me.mailIndex,
        type: me.mailType,
        size: 0,
        body: {
          aggs: {
            tags: {
              terms: {
                size: 10000,
                field: "tags"
              }
            }
          }
        }
      }, function (error, response) {
        console.log("Finished")
        if (error) {
          observer.error(error);
        } else {
          response.aggregations.tags.buckets.forEach((tag) => {
            observer.next(tag);
          }, {});
        }

        observer.complete();
      });
    });
  }
}
