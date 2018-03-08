import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {Registration} from '../../shared/model/registration';
import {JobServiceRegistrationService} from '../../shared/services/job-service-registration.service';
import {OntologyService} from '../../shared/services/ontology.service';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-job-service-editor',
  templateUrl: './job-service-editor.component.html',
  styleUrls: ['./job-service-editor.component.scss']
})
export class JobServiceEditorComponent implements OnInit, OnDestroy {

  public categories;
  private registration: Observable<Registration>;
  private subscription: any;
  private registrationId;
  protected isNew = true;

  public service: Registration;
  protected originalService: Registration;
  protected title: string;
  public industries: string[] = [];
  public professions: string[] = [];
  public competences: string[] = [];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private toastrService: ToastrService,
              protected jobServicesService: JobServiceRegistrationService,
              protected ontologyService: OntologyService) {
  }


  private static arrayToString(arr: any[]): string {
    if (arr == null || arr.length === 0) {
      return 'All';
    }
    return arr.map((value: any) => value.value ? value.value : value).join(',');
  }

  private static stringToArray(text: string): any[] {
    if (text == null || text.trim().length === 0) {
      return [{'value': 'all', 'display': 'All'}];
    }
    return text.split(',');
  }


  public doEncodeURI(url) {
    return encodeURI(url);
  }


  ngOnInit() {

    this.categories = this.jobServicesService.getCategories();
    this.categories.subscribe(
      result => console.log('categories: ', result),
      error => console.log('categories error: ', error),
      () => console.log('categories loaded'));

    this.subscription = this.route.params.subscribe(params => {
      this.registrationId = params['id'];
      if (this.registrationId) {
        // console.log('Got registrationId: ' + this.registrationId + ' from route');
        this.registration = this.jobServicesService.get(this.registrationId);
        this.registration.subscribe(reg => {
          this.isNew = false;
          this.originalService = reg;
          this.service = new Registration();
          Object.assign(this.service, reg);
          console.log('got registration:', this.service);
        });
      } else {
        this.service = new Registration();
      }
      this.industries = JobServiceEditorComponent.stringToArray(this.service.industries);
      this.professions = JobServiceEditorComponent.stringToArray(this.service.professions);
      this.competences = JobServiceEditorComponent.stringToArray(this.service.competences);
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
    if (theForm.form.valid) {

      this.service.industries = JobServiceEditorComponent.arrayToString(this.industries);
      this.service.professions = JobServiceEditorComponent.arrayToString(this.professions);
      this.service.competences = JobServiceEditorComponent.arrayToString(this.competences);

      console.log('onSave ', this.service);

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

  onReset() {
    this.service = Object.create(this.originalService);
    this.industries = JobServiceEditorComponent.stringToArray(this.originalService.industries);
    this.professions = JobServiceEditorComponent.stringToArray(this.originalService.professions);
    this.competences = JobServiceEditorComponent.stringToArray(this.originalService.competences);
  }

  onBackToList() {
    this.router.navigate(['/service']);
  }

  autocompleteForProfessions = (text: string): Observable<any> => {
    return this.ontologyService.professions(text);
  }

  autocompleteForCompetences = (text: string): Observable<any> => {
    return this.ontologyService.competences(text);
  }
}


