import { Injectable } from '@angular/core';
import { remote } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { Account } from './Account';
import { Observable } from 'rxjs';

const app = remote.app;

@Injectable()
export class AccountService {

  private filename : string
  private accountConfig = [];

  constructor() {
    this.filename = path.join(app.getPath('userData'), 'accounts.json')
  }

  private reloadConfig() {
    try {
      this.accountConfig = JSON.parse(fs.readFileSync(this.filename).toString());
    } catch (e) {
    }
  }

  private saveConfig() {
    fs.writeFileSync(this.filename, JSON.stringify(this.accountConfig, null, 2));
  }

  addAccount(account: Account) {
    console.log(account)
    this.reloadConfig();
    this.accountConfig.push(account);
    this.saveConfig();
  }

  getAccounts() : Observable<Account> {
    this.reloadConfig();
    return Observable.from(this.accountConfig);
  }

}
