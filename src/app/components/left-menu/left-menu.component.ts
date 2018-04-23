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
      href: "/tags/Inbox",
      unread: 123
    }, {
      icon: "send",
      name: "Sent",
      href: "/tags/Sent"
    }, {
      icon: "star",
      name: "Starred",
      href: "/tags/Starred"
    }, {
      icon: "drafts",
      name: "Drafts",
      href: "/tags/Drafts",
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
