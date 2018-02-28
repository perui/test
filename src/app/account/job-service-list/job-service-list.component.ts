import { Component, OnInit } from '@angular/core';
import {JobServiceRegistrationService} from '../../shared/services/job-service-registration.service';
import {Registration} from '../../shared/model/registration';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

@Component({
  selector: 'app-job-services-list',
  templateUrl: './job-service-list.component.html',
  styleUrls: ['./job-service-list.component.scss']
})
export class JobServiceListComponent implements OnInit {

  public myRegistrations: Observable<Registration[]>;

  constructor(private router: Router,
              protected jobServicesService: JobServiceRegistrationService) { }


  ngOnInit() {
    this.myRegistrations = this.jobServicesService.list();

    this.myRegistrations.subscribe(list => {
      console.log('got myRegistrations:', list);
    });
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

  togglePublish(registration: Registration){
    if (registration.published) {
      this.jobServicesService.unpublish(registration);
    } else {
      this.jobServicesService.publish(registration);
    }
  }
}
