import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import * as _ from 'lodash';
import { AccountService } from '../../accounts/account.service';
import { Account } from '../Account';

@Component({
  selector: 'account-add',
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.scss']
})
export class AccountAddComponent implements OnInit {

  private userDataFormGroup : FormGroup;
  private serverDataFormGroup : FormGroup;

  private smtpPorts = [25, 465, 587];
  private popPorts = [110, 143, 993, 995, 1110, 2221];

  private nameFormControl = new FormControl('Romeu', [Validators.required]);
  private emailFormControl = new FormControl('romeu@gmail.com', [Validators.required, Validators.email]);

  constructor(public dialogRef: MatDialogRef<AccountAddComponent>,
    private formBuilder: FormBuilder,
    private accountManager: AccountService) { }

  ngOnInit() {
    this.userDataFormGroup = this.formBuilder.group({
      name: this.nameFormControl,
      email: this.emailFormControl,
      password: new FormControl(),
    });

    this.serverDataFormGroup = this.formBuilder.group({
      popServer: new FormControl(),
      popPort: new FormControl(),
      popUsername: new FormControl(),
      popPassword: new FormControl(),

      smtpServer: new FormControl(),
      smtpPort: new FormControl(),
      smtpUsername: new FormControl(),
      smtpPassword: new FormControl(),
    });
  }

  stepChanged($event) {
    const [username, host] = this.userDataFormGroup.controls.email.value.split('@');

    if (!this.serverDataFormGroup.controls.popServer.value) {
      this.serverDataFormGroup.controls.popServer.setValue(`pop.${host}`);
    }

    if (!this.serverDataFormGroup.controls.popPort.value) {
      this.serverDataFormGroup.controls.popPort.setValue(_.first(this.popPorts));
    }

    if (!this.serverDataFormGroup.controls.popUsername.value) {
      this.serverDataFormGroup.controls.popUsername.setValue(this.userDataFormGroup.controls.email.value);
    }

    if (!this.serverDataFormGroup.controls.popPassword.value) {
      this.serverDataFormGroup.controls.popPassword.setValue(this.userDataFormGroup.controls.password.value);
    }

    if (!this.serverDataFormGroup.controls.smtpServer.value) {
      this.serverDataFormGroup.controls.smtpServer.setValue(`smtp.${host}`);
    }

    if (!this.serverDataFormGroup.controls.smtpPort.value) {
      this.serverDataFormGroup.controls.smtpPort.setValue(_.first(this.smtpPorts));
    }

    if (!this.serverDataFormGroup.controls.smtpUsername.value) {
      this.serverDataFormGroup.controls.smtpUsername.setValue(this.userDataFormGroup.controls.email.value);
    }

    if (!this.serverDataFormGroup.controls.smtpPassword.value) {
      this.serverDataFormGroup.controls.smtpPassword.setValue(this.userDataFormGroup.controls.password.value);
    }
  }

  closeDialog() {

    const userControls = this.userDataFormGroup.controls;
    const serverControls = this.serverDataFormGroup.controls;

    const account: Account = {
      name: userControls.name.value,
      email: userControls.email.value,
      password: userControls.password.value,
      pop: {
        server: serverControls.popServer.value,
        port: serverControls.popPort.value,
        username: serverControls.popUsername.value,
        password: serverControls.popPassword.value,
      },
      smtp: {
        server: serverControls.smtpServer.value,
        port: serverControls.smtpPort.value,
        username: serverControls.smtpUsername.value,
        password: serverControls.smtpPassword.value,
      }
    };

    this.accountManager.addAccount(account);
    this.dialogRef.close();
  }

}
