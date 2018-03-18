import { Injectable } from '@angular/core';
import { MailService } from './mail.service';
import { ESService } from './es.service';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

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

  getAll(tag: string) {
    const me = this;
    return Observable.create(function (observer) {
      me.client.search({
        index: me.mailIndex,
        type: me.mailType,
        from: 0,
        size: 50,
        q: tag ? `tags:"${tag}"` : null
      }, function (error, response) {
        console.log(response)
        if (error) {
          observer.error(error);
        } else {
          response.hits.hits.forEach(function (hit) {
            observer.next(hit._source);
          });
        }

        observer.complete();
      });
    });
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
