import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {JobServiceRegistrationService} from '../../shared/services/job-service-registration.service';
import { JobServiceDetailsComponent } from './job-service-details.component';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs/Observable';


class MockJobServiceRegistrationService {
  get(){
    return Observable.of('');
  }
}

class MockToastrService {

}

describe('JobServiceDetailsComponent', () => {
  let component: JobServiceDetailsComponent;
  let fixture: ComponentFixture<JobServiceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ JobServiceDetailsComponent ],
      providers: [
        {provide: JobServiceRegistrationService, useClass: MockJobServiceRegistrationService},
        {provide: ToastrService, useClass: MockToastrService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobServiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


