import { Injectable } from '@angular/core';
import { MailService } from './mail.service';
import { Observable } from 'rxjs';

@Injectable()
export class FakemailService extends MailService {

  constructor() {
    super();
  }

  getByTag(tag: string): Observable<any> {
    const me = this;
    return Observable.range(0, 10)
    .mergeMap((number) => {
      return me.get(number)
    });
  }

  get(id): Observable<any> {
    return Observable.of({
      messageId: id,
      subject: `Mail ${id + 1} - subject`,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      from: {
        value: [
          {
            name: "Romeu",
            address: "romeupalos@mgmail.com"
          }
        ]
      },
      read: true
    });
  }

  save(mail, read) {
    console.log('Email saved')
  }

  getTags(): Observable<any> {
    return Observable.from(['tag1', 'tag2']);
  }

}
