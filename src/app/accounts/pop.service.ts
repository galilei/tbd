import { Injectable } from '@angular/core';
import { remote } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { Account } from './Account';
import { Observable } from 'rxjs';
import * as POP3Client from 'poplib';
import { AccountService } from './account.service';

const app = remote.app;

@Injectable()
export class PopService {

  constructor(private accountManager: AccountService) {
  }

  verifyMail() {
    this.accountManager.getAccounts().forEach((account) => {
      console.log("Starting for " + account.email);
      var client = new POP3Client(account.pop.port, account.pop.server, {
        tlserrs: false,
        enabletls: false,
        debug: false
      });

      client.on("connect", function () {
        console.log("CONNECT success");
        client.login(account.pop.username, account.pop.password);
      });

      client.on("login", function (status, rawdata) {
        if (status) {
          console.log("LOGIN/PASS success");
          client.list();
        } else {
          console.log("LOGIN/PASS failed");
          client.quit();
        }
      });

      // Data is a 1-based index of messages, if there are any messages
      client.on("list", function (status, msgcount, msgnumber, data, rawdata) {
        if (status === false) {
          console.log("LIST failed");
          client.quit();
        } else {
          console.log("LIST success with " + msgcount + " element(s)");
          if (msgcount > 0)
            client.retr(1);
          else
            client.quit();
        }
      });

      client.on("retr", function (status, msgnumber, data, rawdata) {
        if (status === true) {
          console.log("RETR success for msgnumber " + msgnumber);
          // client.dele(msgnumber);
          client.quit();
        } else {
          console.log("RETR failed for msgnumber " + msgnumber);
          client.quit();
        }
      });

      client.on("dele", function (status, msgnumber, data, rawdata) {
        if (status === true) {
          console.log("DELE success for msgnumber " + msgnumber);
          client.quit();
        } else {
          console.log("DELE failed for msgnumber " + msgnumber);
          client.quit();
        }
      });

      client.on("quit", function (status, rawdata) {
        if (status === true) console.log("QUIT success");
        else console.log("QUIT failed");
      });

    });

  }

}
