import { TestBed } from '@angular/core/testing';

import { APINestService } from './api-nest.service';

describe('APINestService', () => {
  let service: APINestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APINestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
