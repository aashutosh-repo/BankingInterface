import { TestBed } from '@angular/core/testing';

import { CustomerOnboardingService } from './customer-onboarding.service';

describe('CustomerOnboardingService', () => {
  let service: CustomerOnboardingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerOnboardingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
