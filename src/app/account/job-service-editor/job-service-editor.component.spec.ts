import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { FormsModule} from '@angular/forms';
import {JobServiceRegistrationService} from '../../shared/services/job-service-registration.service';
import { JobServiceEditorComponent } from './job-service-editor.component';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs/Observable';
import {OntologyService} from '../../shared/services/ontology.service';
import {TagInputModule} from 'ngx-chips';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


class MockJobServiceRegistrationService {
  get() {
    return Observable.of('');
  }
}

class MockToastrService { }
class MockOntologyService { }

describe('JobServiceEditorComponent', () => {
  let component: JobServiceEditorComponent;
  let fixture: ComponentFixture<JobServiceEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, FormsModule, TagInputModule, BrowserAnimationsModule ],
      declarations: [ JobServiceEditorComponent ],
      providers: [
        {provide: JobServiceRegistrationService, useClass: MockJobServiceRegistrationService},
        {provide: ToastrService, useClass: MockToastrService},
        {provide: OntologyService, useClass: MockOntologyService},
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
