import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { JobServiceListComponent } from './job-service-list.component';
import {JobServiceRegistrationService} from '../../shared/services/job-service-registration.service';


describe('JobServicesListComponent', () => {
  let component: JobServiceListComponent;
  let fixture: ComponentFixture<JobServiceListComponent>;
  // let location: Location;
  // let router: Router;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // imports: [    RouterTestingModule.withRoutes(routes)],
      imports: [ RouterTestingModule ],
      declarations: [ JobServiceListComponent ],
      providers: [JobServiceRegistrationService]
    })
    .compileComponents();

    // router = TestBed.get(Router);
    // location = TestBed.get(Location);

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




