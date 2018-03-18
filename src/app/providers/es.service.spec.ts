import { TestBed, inject } from '@angular/core/testing';

import { ESService } from './es.service';

describe('ESService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ESService]
    });
  });

  it('should be created', inject([ESService], (service: EsService) => {
    expect(service).toBeTruthy();
  }));
});
