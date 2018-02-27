import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {Registration} from '../../shared/model/registration';
import {JobServiceRegistrationService} from '../../shared/services/job-service-registration.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
// import { debounceTime } from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';


// const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
//   'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
//   'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
//   'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
//   'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
//   'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
//   'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
//   'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];


@Component({
  selector: 'app-job-service-editor',
  templateUrl: './job-service-editor.component.html',
  styleUrls: ['./job-service-editor.component.scss']
})
export class JobServiceEditorComponent implements OnInit, OnDestroy {

  public categories = [{value: 'job-site', label: 'Job site'}];
  private registration: Observable<Registration>;
  private subscription: any;
  private registrationId;
  protected isNew = true;

  protected service: Registration;
  protected originalService: Registration;
  protected title: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private toastrService: ToastrService,
              protected jobServicesService: JobServiceRegistrationService) {

    // this.serviceForm = formBuilder.group({
    //   id: [null, ],
    //   title: ['', Validators.required],
    //   description: ['', Validators.required],
    //   category: this.formBuilder.array([]),
    //   industry: this.formBuilder.array([]),
    //   professions: this.formBuilder.array([]),
    //   competences: this.formBuilder.array([]),
    //   url: ['', Validators.required],
    //   published: ['', Validators.required]
    // });
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
          this.originalService = reg;
          this.service = Object.create(reg);
        });
      }
    });

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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


  onSave(theForm) {
    if (!theForm.form.invalid) {
      if (this.isNew) {
        this.jobServicesService.add(this.service)
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
        this.jobServicesService.update(this.service)
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

  onBackToList() {
    this.router.navigate(['/service']);
  }


  arrayToString(text:string[]){
    return text.join(', ');
  }
}
