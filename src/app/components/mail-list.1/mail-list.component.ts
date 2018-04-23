import { Component, OnChanges, Input } from '@angular/core';
import { MailService } from '../../providers/mail.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./mail-list.component.scss']
})
export class MailListComponent implements OnChanges {
  private mails: Observable<any[]> = Observable.empty().toArray();

  @Input()
  private tag: string = 'Inbox';

  @Input()
  private first = 1;

  @Input()
  private size = 50;

  constructor(public mailService: MailService) {
    this._refreshMail()
  }

  private _refreshMail() {
    this.mails = this.mailService.getByTag(this.tag)
      .skip(this.first - 1)
      .take(this.size)
      .toArray();
  }

  ngOnChanges(changes) {
    this._refreshMail();
  }

  setTag(tag) {
    this.tag = tag;
    this._refreshMail();
  }

  isToday(d: Date) {
    if (!(d instanceof Date)) {
      d = new Date(d);
    }
    return d.toDateString() === new Date().toDateString();
  }
}
