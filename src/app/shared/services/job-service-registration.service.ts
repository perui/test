import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Registration} from '../model/registration';
import {environment} from '../../../environments/environment';
import {KeycloakService} from './keycloak/keycloak.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class JobServiceRegistrationService {

  constructor(
    public idp: KeycloakService,
    private http: HttpClient) {
  }

  getOrganisationsServices(organisationIdentifyer: string): Observable<Registration[]> {
    if (!this.idp.authenticated()) {
      throw new Error('Not authenticated yet');
    }

    const url = `${environment.serviceProviderUrl}/service/v1/findByOrganisation/${organisationIdentifyer}`;
    return  this.http.get<Registration[]>(url, this.createHeader());
  }

  get(registrationId: string): Observable<Registration> {
    const url = `${environment.serviceProviderUrl}/service/v1/${registrationId}`;
    return this.http.get<Registration>(url, this.createHeader());
  }

  add(registration: Registration): Observable<any> {
    if (registration.id != null) {
      return Observable.throw('The registration is already saved ' + registration.id);
    }

    const url = `${environment.serviceProviderUrl}/service/v1/create`;
    return this.http.post(url, registration, this.createHeader());
  }

  update(registration: Registration): Observable<any> {
    if (registration.id == null) {
      return Observable.throw('The registration is not saved ' + registration.id);
    }

    const url = `${environment.serviceProviderUrl}/service/v1/update`;
    return this.http.put(url, registration, this.createHeader());
  }

  remove(registrationId): Observable<any> {
    const url = `${environment.serviceProviderUrl}/service/v1/${registrationId}`;

    return this.http.delete(url, this.createHeader());
  }

  publish(registration: Registration): Observable<any> {
    registration.published = true;
    const url = `${environment.serviceProviderUrl}/service/v1/publish/${registration.id}`;

    return this.http.put(url, registration, this.createHeader());
  }

  unpublish(registration: Registration): Observable<any> {
    registration.published = false;
    const url = `${environment.serviceProviderUrl}/service/v1/unpublish/${registration.id}`;

    return this.http.put(url, registration, this.createHeader());
  }

  getCategories(): Observable<any> {
    const url = `${environment.serviceProviderUrl}/service/category/v1/names`;
    return this.http.get(url, this.createHeader());
  }

  private createHeader() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${this.idp.client().token}`
      })
    };
  }
}
