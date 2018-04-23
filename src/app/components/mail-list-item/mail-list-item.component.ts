import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'mail-list-item',
  templateUrl: './mail-list-item.component.html',
  styleUrls: ['./mail-list-item.component.scss']
})
export class MailListItemComponent implements OnInit {
  @Input()
  private mail: any;

  constructor() { }

  ngOnInit() {
  }

  getSmallDate(d: Date) {
    const momentDate = moment(d);

    if (momentDate.isSame(moment(), 'day')) {
      return momentDate.format('hh:mm a');
    } else if (momentDate.isSame(moment(), 'year')) {
      return momentDate.format('MMM YY');
    } else {
      return momentDate.format('MM/DD/YY');
    }
  }

  getDate(d: Date) {
    return moment(d).format();
  }

}
