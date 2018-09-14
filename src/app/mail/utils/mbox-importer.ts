import { ObservableMbox } from './observable-mbox';
import { simpleParser } from 'mailparser';
import { MailService } from '../../providers/mail.service'
import { Observable } from 'rxjs';

export class MboxImporter {

  constructor(
    private mailService: MailService
  ) {}

  import(filename) {
    return ObservableMbox.import(filename)
      .concatMap((msg) => {
        // me.parsedSize += msg.length;
        return Observable.fromPromise(simpleParser(new Buffer(msg))) as Observable<any>
      })
      .subscribe((mail) => {
        // mail.tags = '#inbox';
        console.dir(mail, {depth: null, colors: true})
        // this.mailService.save(mail, true);
      }, () => console.error(), () =>console.log('complete') )

  }

}
