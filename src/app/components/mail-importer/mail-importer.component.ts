import * as fs from 'fs';
import * as path from 'path';
import * as Mbox from 'node-mbox';
import * as _ from "lodash";
import * as async from "async";
import { simpleParser, MailParser } from 'mailparser';
import { remote, MessageBoxOptions } from 'electron';
import { Input, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MailService } from '../../providers/mail.service'

const app = remote.app;

@Component({
  selector: 'mail-importer',
  templateUrl: './mail-importer.component.html',
  styleUrls: ['./mail-importer.component.scss']
})
export class MailImporterComponent implements OnInit {

  @Input()
  private maildir;

  @Input()
  private totalSize: number = 0;

  @Input()
  private currentPath: string = '';

  @Input()
  private parsedSize: number = 0;

  @Input()
  private startTime: Date = null;

  @Input()
  private endTime: Date = null;

  constructor(public mailService : MailService) { }

  ngOnInit() {
    // Check for Thunderbird
    const home = app.getPath('home');
    const thunderbirdFolder = path.join(home, '.thunderbird');
    if (fs.existsSync(thunderbirdFolder)) {
      const mailFolder = _.first(fs.readdirSync(thunderbirdFolder)
        .filter((file) => file.endsWith('.default'))
        .filter((file) => fs.lstatSync(path.join(thunderbirdFolder, file)).isDirectory()));

      const rootFolder = path.join(thunderbirdFolder, mailFolder, 'Mail');
      const sizeDetails = this._getMailDetails(rootFolder, '');
      this.totalSize = sizeDetails.totalSize;
      console.log('total size', sizeDetails);
      this._importMail(rootFolder, sizeDetails.mailFolders);
    }
  }

  _getMailDetails(root, currentPath) {
    let totalSize = 0;
    let mailFolders = [];
    const fileList = fs.readdirSync(path.join(root, currentPath));
    fileList
      .filter((file) => !file.endsWith('msf'))
      .filter((file) => file !== 'msgFilterRules.dat')
      .forEach((file) => {
        const stat = fs.lstatSync(path.join(root, currentPath, file));
        if (stat.isDirectory()) {
          const sizeDetails = this._getMailDetails(root, path.join(currentPath, file));
          totalSize += sizeDetails.totalSize;
          mailFolders = _.concat(mailFolders, sizeDetails.mailFolders);
        } else {
          if (stat.size > 0) {
            totalSize += stat.size;
            mailFolders.push({
              dir: path.join(currentPath, file),
              size: stat.size
            });
          }
        }
      });

    return {
      totalSize,
      mailFolders
    };
  }

  _importMail(root, mailFolders) {
    const me = this;

    async.eachLimit(mailFolders, 1, (mailFolder, cb) => {
      me.currentPath = mailFolder.dir;
      const mbox = new Mbox(path.join(root, mailFolder.dir));
      mbox.on('message', (msg) => {
        me.parsedSize += msg.length;

        simpleParser(new Buffer(msg))
          .then(mail => {

            mail.tags = [
              mailFolder.dir
                .replace(/.sbd\//g, '/')
                .slice(mailFolder.dir.indexOf('/') + 1)
            ];

            this.mailService.save(mail, true);

            // console.log('Recebeu', mail);
          }).catch(err => {
            console.log(`fail processing mail ${mailFolder.dir}`, err);
          });
      });

      mbox.on('end', () => {
        console.log('ended')
        cb();
      });

      mbox.on('error', function (err) {
        console.log('got an error', err);
        cb(err);
      });
    }, (err, result) => {
      console.log('Got error when parsing email: ', err);
    });
  }

  _parseMessage(message) {
    console.log(message);
  }

}
