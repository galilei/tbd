import { TestBed, inject } from '@angular/core/testing';

import { MailImporterService } from './mail-importer.service';

describe('MailImporterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MailImporterService]
    });
  });

  it('should be created', inject([MailImporterService], (service: MailImporterService) => {
    expect(service).toBeTruthy();
  }));
});
