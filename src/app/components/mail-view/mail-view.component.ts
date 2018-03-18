import { Component, OnInit, Input } from '@angular/core';
import { MailService } from '../../providers/mail.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '@angular/common';

@Component({
  selector: 'app-mail-view',
  templateUrl: './mail-view.component.html',
  styleUrls: ['./mail-view.component.scss']
})
export class MailViewComponent implements OnInit {

  @Input()
  private id: string;

  @Input()
  private mail$: Observable<any>;

  constructor(private mailService: MailService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private location: Location) {
    this.route.params.subscribe(res => {
      console.log(mailService)
      this.mail$ = mailService.get(res.id)
      .map((mail) => {
        mail.html = this.sanitizer.bypassSecurityTrustHtml(mail.html);
        return mail;
      });
    })

  }

  ngOnInit() {
  }

}
