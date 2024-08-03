import { TestBed } from '@angular/core/testing';

import { CurdServiceService } from './curd-service.service';

describe('CurdServiceService', () => {
  let service: CurdServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurdServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
