import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { AccountAddComponent } from '../account-add/account-add.component';
import { Account } from '../Account';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {

  private accounts$ : Observable<Account[]>;

  constructor(public dialog : MatDialog, private accountManager : AccountService) { }

  ngOnInit() {
    this.accounts$ = this.accountManager.getAccounts().toArray();
  }

  addAccount() {
    this.dialog.open(AccountAddComponent);
  }

}
