import { Component, OnChanges, Input, OnInit } from '@angular/core';
import { MailService } from '../../providers/mail.service';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./mail-list.component.scss']
})
export class MailListComponent implements OnInit, OnChanges {
  private mails$: Observable<any[]> = Observable.of([]);

  @Input()
  private tag: string = 'Inbox';

  @Input()
  private first = 1;

  private page = 1;

  @Input()
  private size = 50;

  constructor(public mailService: MailService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.pluck('tag')
      .forEach(tag => this._refreshMail(tag));
  }

  private _refreshMail(tag) {
    this.tag = tag;
    this.mails$ = this.mailService.getByTag(tag)
      .skip(this.first - 1)
      .take(this.size)
      .toArray();
  }

  changePage($event : PageEvent) {
    console.log($event);
    this.first = $event.pageSize * $event.pageIndex;
    this.size = $event.pageSize
    this.page = $event.pageIndex;
    this._refreshMail(this.tag)
  }

  ngOnChanges(changes) {
    console.log(changes)
    this._refreshMail(this.tag);
  }

  setTag(tag) {
    this.tag = tag;
    this._refreshMail(this.tag);
  }
}
