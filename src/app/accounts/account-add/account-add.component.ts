import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.scss']
})
export class AccountAddComponent implements OnInit {

  private nameFormControl = new FormControl('', [Validators.required]);
  private emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor() { }

  ngOnInit() {
  }

}
