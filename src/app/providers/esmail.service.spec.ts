import { TestBed, inject } from '@angular/core/testing';

import { ESMailService } from './esmail.service';

describe('ESMailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EsmailService]
    });
  });

  it('should be created', inject([ESMailService], (service: ESMailService) => {
    expect(service).toBeTruthy();
  }));
});
