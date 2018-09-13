import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {

  @Input()
  private collapsed: boolean = false;

  private links = [
    {
      icon: "inbox",
      name: "Inbox",
      href: "/mail/#inbox",
      unread: 123
    }, {
      icon: "send",
      name: "Sent",
      href: "/mail/#sent",
    }, {
      icon: "star",
      name: "Starred",
      href: "/mail/#starred",
    }, {
      icon: "drafts",
      name: "Drafts",
      href: "/mail/#drafts",
      unread: 1
    }, {
      debug: true,
      divider: true
    }, {
      debug: true,
      icon: "account_circle",
      name: "Accounts",
      href: "/accounts"
    }, {
      divider: true
    }, {
      icon: "settings",
      name: "Settings",
      href: "/settings"
    }];

  constructor() { }

  ngOnInit() {
  }

}
