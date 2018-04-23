import { Component, OnInit, HostBinding, ViewChild, ElementRef } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import * as _ from 'lodash'
import { MatAutocompleteSelectedEvent } from '@angular/material';

enum RecipientType {
  TO,
  CC,
  BCC
}

class Recipient {
  name: string;
  email: string;
  type: RecipientType;
}

@Component({
  selector: 'new-mail',
  templateUrl: './new-mail.component.html',
  styleUrls: ['./new-mail.component.scss']
})
export class NewMailComponent implements OnInit {
  @HostBinding('class.minimized')
  private minimized: boolean = false;

  private addKeysCodes = [ENTER, COMMA]

  private subject : string = 'test';

  // FIXME: do not allow duplicated entries
  private recipients: Set<Recipient> = new Set();

  private lastSelectedType: RecipientType = RecipientType.TO;

  private recipientCandidates = [{
    name: "Romeu",
    email: "romeupalos@gmail.com"
  }];

  private filteredCandidates;

  private toFormControl: FormControl = new FormControl();

  @ViewChild('toInput')
  private toInput: ElementRef;

  constructor() {
    this.filteredCandidates = this.toFormControl.valueChanges
      .filter((text) => text instanceof String).pipe(
      startWith(''),
      map(this.filterRecipients.bind(this))
    );
  }

  ngOnInit() {
  }

  filterRecipients(text) {
    return this.recipientCandidates.filter((recipient) => _.includes(recipient.name.toLocaleLowerCase(), text.toLocaleLowerCase()));
  }

  getChipColor(type) {
    switch(type) {
      case RecipientType.TO:
        return 'primary';
      case RecipientType.CC:
        return 'secondary';
      case RecipientType.BCC:
        return 'accent';
    };
  }

  addSelectedRecipient($event: MatAutocompleteSelectedEvent) {
    console.log($event)
    console.log(this.toInput)

    // TODO: validate if it's a valid address
    let value = $event.option.value;
    this.recipients.add({ name: value.name, email: value.email, type: this.lastSelectedType });
    this.toInput.nativeElement.value = '';
  }

  addRecipient($event) {
    console.log($event)

    // TODO: validate if it's a valid address

    let input = $event.input;
    let value = $event.value;

    if ((value || '').trim()) {
      this.recipients.add({ name: value.trim(), email: '', type: this.lastSelectedType });
    }

    input.value = '';
  }

  removeRecipient(recipient) {
    this.recipients.delete(recipient);
  }

  getText(recipient) {
    switch (recipient.type) {
      case RecipientType.TO:
        return "to: "
      case RecipientType.CC:
        return "cc: "
      case RecipientType.BCC:
        return "bcc: "
    };
  }

  changeType(recipient) {
    switch (recipient.type) {
      case RecipientType.TO:
        recipient.type = this.lastSelectedType = RecipientType.CC;
        break;
      case RecipientType.CC:
        recipient.type = this.lastSelectedType = RecipientType.BCC;
        break;
      case RecipientType.BCC:
        recipient.type = this.lastSelectedType = RecipientType.TO;
        break;
    };
  }

}
