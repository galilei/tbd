import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MailService } from '../../providers/mail.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {

  private accounts$ : Observable<any[]>;

  constructor(private mailService: MailService) { }

  ngOnInit() {
  }

}
