import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Registration} from '../../shared/model/registration';
import {JobServiceRegistrationService} from '../../shared/services/job-service-registration.service';
import {Observable} from 'rxjs/Observable';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-job-service-editor',
  templateUrl: './job-service-editor.component.html',
  styleUrls: ['./job-service-editor.component.scss']
})
export class JobServiceEditorComponent implements OnInit, OnDestroy {

  public categories = ['job-sites'];
  private registration: Observable<Registration>;
  private subscription: any;
  private registrationId;
  protected isNew = true;
  protected serviceForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private toastrService: ToastrService,
              protected jobServicesService: JobServiceRegistrationService) {

    this.serviceForm = fb.group({
      id: [null, ],
      title: ['', Validators.required],
      category: [null, Validators.required],
      description: ['', Validators.required],
      industry: ['', Validators.required],
      professions: ['', Validators.required],
      competences: ['', Validators.required],
      url: ['', Validators.required],
      published: ['', Validators.required]
    });
  }


  ngOnInit() {

    this.subscription = this.route.params.subscribe(params => {
      this.registrationId = params['id'];
      console.log('Got registrationId: ' + this.registrationId + ' from route');
      if (this.registrationId) {
        this.registration = this.jobServicesService.get(this.registrationId);
        this.registration.subscribe(reg => {
          console.log('got registration:', reg);
          this.isNew = false;
          this.serviceForm.setValue(reg);
        });
      }
    });

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onAbort() {
    this.toastrService.info('Aborted');
    this.router.navigate(['/service']);
  }

  onDelete() {
    if (confirm('Do you really want to delete this service?')) {
      this.jobServicesService.remove(this.registrationId).subscribe(
        () => {
          this.toastrService.success('Removed service');
          this.router.navigate(['/service']);
        },
        (error) => {
          this.toastrService.error('Failed to remove the service');
          console.error('Failed to remove the service', error);
        }
      );
    }
  }


  onSave(){
    if (!this.serviceForm.invalid) {
      if (this.isNew) {
        this.jobServicesService.add(this.serviceForm.value)
          .subscribe(
            () => {
              this.toastrService.success('The service was successfully registered');
              this.router.navigate(['/service']);
            },
            (error) => {
              this.toastrService.error('Failed to register the service');
              console.error('Failed to register the service', error);
            });
      } else {
        this.jobServicesService.update(this.serviceForm.value)
          .subscribe(
            () => {
              this.toastrService.success('Changes was saved successful');
              this.router.navigate(['/service']);
            },
            (error) => {
              this.toastrService.error('Failed to save the changes');
              console.error('Failed to save the changes', error);
            });
      }
    } else {
      this.toastrService.error('Can not save or update the service, the form contains errors');
      return false;
    }
  }

}
