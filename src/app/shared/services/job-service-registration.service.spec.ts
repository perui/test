import { TestBed, inject } from '@angular/core/testing';

import { JobServiceRegistrationService } from './job-service-registration.service';
import {HttpClientModule} from '@angular/common/http';
import {KeycloakService} from './keycloak/keycloak.service';

describe('JobServiceRegistrationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [JobServiceRegistrationService,
        KeycloakService]
    });
  });

  it('should be created', inject([JobServiceRegistrationService], (service: JobServiceRegistrationService) => {
    expect(service).toBeTruthy();
  }));
});
