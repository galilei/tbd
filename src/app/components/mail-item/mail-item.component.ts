import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment'

@Component({
  selector: 'mail-item',
  templateUrl: './mail-item.component.html',
  styleUrls: ['./mail-item.component.scss']
})
export class MailItemComponent implements OnInit {
  @Input()
  private mail;

  constructor() { }

  ngOnInit() {
  }

  getDate(d: Date) {
    const mailDate = moment(d);

    let dateStr;
    let timeDiff = '';
    let diff;
    if ((diff = moment().diff(mailDate, 'years')) > 0) {
      timeDiff = ` (${diff} year${diff > 1 ? 's' : ''} ago)`
    } else if ((diff = moment().diff(mailDate, 'months')) > 0) {
      timeDiff = ` (${diff} month${diff > 1 ? 's' : ''} ago)`
    } else if ((diff = moment().diff(mailDate, 'days')) > 0) {
      timeDiff = ` (${diff} day${diff > 1 ? 's' : ''} ago)`
    } else if ((diff = moment().diff(mailDate, 'hours')) > 0) {
      timeDiff = ` (${diff} hour${diff > 1 ? 's' : ''} ago)`
    } else if ((diff = moment().diff(mailDate, 'minutes')) > 0) {
      timeDiff = ` (${diff} minute${diff > 1 ? 's' : ''} ago)`
    } else {
      timeDiff = ` (less than a minute ago)`
    }

    if (mailDate.isSame(moment(), 'day')) {
      return `${mailDate.format('hh:mm a')}${timeDiff}`;
    } else if (mailDate.isSame(moment(), 'year')) {
      return `${mailDate.format('MMM YY')}${timeDiff}`;
    } else {
      return `${mailDate.format('MM/DD/YY')}${timeDiff}`;
    }
  }

}
