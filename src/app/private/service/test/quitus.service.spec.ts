import { TestBed } from '@angular/core/testing';

import { QuitusService } from '../quitus.service';

describe('QuitusService', () => {
  let service: QuitusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuitusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
