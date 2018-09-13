import { Component, OnChanges, Input, OnInit } from '@angular/core';
import { MailService } from '../../providers/mail.service';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { PopService } from '../../accounts/pop.service';

@Component({
  selector: 'mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./mail-list.component.scss']
})
export class MailListComponent implements OnInit, OnChanges {
  private mails$: Observable<any[]> = Observable.of([]);

  @Input()
  private label: string = 'Inbox';

  @Input()
  private first = 1;

  private page = 1;

  @Input()
  private size = 50;

  constructor(public mailService: MailService, private popService : PopService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.pluck('label').subscribe(label => this._refreshMail(label));
  }

  private _refreshMail(label) {
    this.label = label;
    this.mails$ = this.mailService.getByTag(label)
      .skip(this.first - 1)
      .take(this.size)
      .toArray();
  }

  changePage($event : PageEvent) {
    console.log($event);
    this.first = $event.pageSize * $event.pageIndex;
    this.size = $event.pageSize
    this.page = $event.pageIndex;
    this._refreshMail(this.label)
  }

  ngOnChanges(changes) {
    console.log(changes)
    this._refreshMail(this.label);
  }

  setTag(tag) {
    this.label = tag;
    this._refreshMail(this.label);
  }
}
