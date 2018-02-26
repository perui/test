import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {JobServiceRegistrationService} from '../../shared/services/job-service-registration.service';
import {Registration} from '../../shared/model/registration';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-job-service-details',
  templateUrl: './job-service-details.component.html',
  styleUrls: ['./job-service-details.component.scss']
})
export class JobServiceDetailsComponent implements OnInit, OnDestroy {

  private registration: Observable<Registration>
  private subscription: any;
  private registrationId;

  constructor(private router: Router,
              private route: ActivatedRoute,
              protected jobServicesService: JobServiceRegistrationService) {
  }


  ngOnInit() {

    this.subscription = this.route.params.subscribe(params => {
        this.registrationId = params['id'];
        console.log('Got registrationId: ' + this.registrationId + ' from route');
        this.registration = this.jobServicesService.get(this.registrationId);

        this.registration.subscribe(reg => {
          console.log('got registration:', reg);
        });
      });

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
