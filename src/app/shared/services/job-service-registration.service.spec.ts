import { TestBed, inject } from '@angular/core/testing';

import { JobServiceRegistrationService } from './job-service-registration.service';

describe('JobServiceRegistrationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JobServiceRegistrationService]
    });
  });

  it('should be created', inject([JobServiceRegistrationService], (service: JobServiceRegistrationService) => {
    expect(service).toBeTruthy();
  }));
});
