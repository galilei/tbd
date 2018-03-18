import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export abstract class MailService {

  constructor() { }

  abstract getAll(tag: string): Observable<any>;

  abstract get(id): Observable<any>;

  abstract save(mail, read);

  abstract getTags(): Observable<any>;

}
