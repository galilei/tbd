import { TestBed, inject } from '@angular/core/testing';

import { FakemailServiceService } from './fakemail-service.service';

describe('FakemailServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FakemailServiceService]
    });
  });

  it('should be created', inject([FakemailServiceService], (service: FakemailServiceService) => {
    expect(service).toBeTruthy();
  }));
});
