import * as Mbox from 'node-mbox';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs';

export class ObservableMbox {

  static import(filename) : Observable<string> {
    return Observable.create((observer: Subscriber<string>) => {
      const mbox = new Mbox(filename);

      mbox.on('message', (msg) => observer.next(msg));
      mbox.on('end', () => observer.complete());
      mbox.on('error', (err) => observer.error(err));

      observer.add(() => mbox.end())
    });
  }

}
