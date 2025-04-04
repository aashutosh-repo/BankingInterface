import { TestBed } from '@angular/core/testing';

import { CustomerOperationService } from './customer-operation.service';

describe('CustomerOperationService', () => {
  let service: CustomerOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerOperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
