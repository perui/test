import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { JobServiceListComponent } from './job-service-list.component';
import {JobServiceRegistrationService} from '../../shared/services/job-service-registration.service';
import {Observable} from 'rxjs/Observable';
import {ToastrService} from 'ngx-toastr';
import {OrganisationService} from '../../shared/services/organisation.service';

class MockJobServiceRegistrationService {
  getOrganisationsServices() {
    return Observable.of('');
  }
}

class MockToastrService { }

class MockOrganisationService {
  getMyOrganisation() { return Observable.of(''); }
}

describe('JobServicesListComponent', () => {
  let component: JobServiceListComponent;
  let fixture: ComponentFixture<JobServiceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ JobServiceListComponent ],
      providers: [
        {provide: JobServiceRegistrationService, useClass: MockJobServiceRegistrationService},
        {provide: ToastrService, useClass: MockToastrService},
        {provide: OrganisationService, useClass: MockOrganisationService},
      ]
    })
    .compileComponents();

  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(JobServiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});




