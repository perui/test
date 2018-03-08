import {Component, OnInit} from '@angular/core';
import {JobServiceRegistrationService} from '../../shared/services/job-service-registration.service';
import {Registration} from '../../shared/model/registration';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-job-services-list',
  templateUrl: './job-service-list.component.html',
  styleUrls: ['./job-service-list.component.scss']
})
export class JobServiceListComponent implements OnInit {

  public myRegistrations: Observable<Registration[]>;

  constructor(private router: Router,
              private toastrService: ToastrService,
              protected jobServicesService: JobServiceRegistrationService) {
  }


  ngOnInit() {
    this.myRegistrations = this.jobServicesService.list();

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
