import {Component, OnInit, OnDestroy} from '@angular/core';
import {JobServiceRegistrationService} from '../../shared/services/job-service-registration.service';
import {Registration} from '../../shared/model/registration';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

import {Organisation} from '../../shared/model/organisation';
import {OrganisationService} from '../../shared/services/organisation.service';
import {ISubscription} from 'rxjs/Subscription';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-job-services-list',
  templateUrl: './job-service-list.component.html',
  styleUrls: ['./job-service-list.component.scss']
})
export class JobServiceListComponent implements OnInit, OnDestroy {

  public myRegistrations: Observable<Registration[]>;
  public registrations: Registration[];
  public myOrganisation: Observable<Organisation>;
  private orgSub: ISubscription;

  constructor(private router: Router,
              private toastrService: ToastrService,
              protected jobServicesService: JobServiceRegistrationService,
              private orgService: OrganisationService) {
  }

  ngOnInit() {

    this.myOrganisation = this.orgService.getMyOrganisation();
    this.orgSub = this.myOrganisation.subscribe(
      org => {
        console.log('Loaded organisation ', org);
        this.myRegistrations = this.jobServicesService.getOrganisationsServices(org.identifier);
      },
      error => {
        console.error('Failed to load your organisation!! ', error);
        if (error.status === 404) {
          this.toastrService.error('No organisation was connected to your account!');
        }
      }
    );
  }

  ngOnDestroy() {
    this.orgSub.unsubscribe();
  }

  onAddNew() {
    this.router.navigate(['/service/add']);
  }

  onEdit(id) {
    this.router.navigate(['/service', id]);
  }

  doEncodeURI(url) {
    return encodeURI(url);
  }

  togglePublish(registration: Registration) {
    if (registration.published) {
      const sub = this.jobServicesService.unpublish(registration)
        .subscribe(
          () => { this.toastrService.info('registration was unpublish successful'); },
          error => {
            this.toastrService.error('Failed to unpublish registration');
            console.error('Failed to unpublish registration', error);
          },
          () => sub.unsubscribe());
    } else {
      const sub = this.jobServicesService.publish(registration)
        .subscribe(
          () => { this.toastrService.info('registration was publish successful'); },
          error => {
            this.toastrService.error('Failed to publish registration');
            console.error('Failed to publish registration', error);
          },
          () => sub.unsubscribe());
    }
  }
}
