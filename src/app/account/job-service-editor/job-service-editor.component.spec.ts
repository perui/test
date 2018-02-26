import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { ReactiveFormsModule} from '@angular/forms';
import {JobServiceRegistrationService} from '../../shared/services/job-service-registration.service';
import { JobServiceEditorComponent } from './job-service-editor.component';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs/Observable';


class MockJobServiceRegistrationService {
  get(){
    return Observable.of('');
  }
}

class MockToastrService {
}


describe('JobServiceEditorComponent', () => {
  let component: JobServiceEditorComponent;
  let fixture: ComponentFixture<JobServiceEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, ReactiveFormsModule ],
      declarations: [ JobServiceEditorComponent ],
      providers: [
        {provide: JobServiceRegistrationService, useClass: MockJobServiceRegistrationService},
        {provide: ToastrService, useClass: MockToastrService},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobServiceEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
