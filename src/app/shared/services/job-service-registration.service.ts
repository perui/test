import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Registration} from '../model/registration';
import {environment} from '../../../environments/environment';
import {KeycloakService} from './keycloak/keycloak.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from './user.service';

@Injectable()
export class JobServiceRegistrationService {

  private user: any;

  constructor(
    public idp: KeycloakService,
    // public userService: UserService,
    private http: HttpClient) {

    // this.userService.getUserJWT();
  }

  list(): Observable<Registration[]> {

    if (!this.idp.authenticated()) {
      throw new Error('Not authenticated yet');
    }

    const userId = this.idp.client().tokenParsed.sub;
    const url = `${environment.serviceProviderUrl}/service/provider/v1/${userId}/services`;

    return  this.http.get<Registration[]>(url, this.createHeader());
  }

  get(registrationId: string): Observable<Registration> {
    console.log('list called');

    const url = `${environment.serviceProviderUrl}/service/v1/${registrationId}`;

    return this.http.get<Registration>(url, this.createHeader());
  }

  add(registration: Registration): Observable<any> {

    console.log('add registration called ', registration);
    if (registration.id != null) {
      return Observable.throw('The registration is already saved ' + registration.id);
    }

    const url = `${environment.serviceProviderUrl}/service/v1/create`;
    return this.http.post(url, registration, this.createHeader());
  }

  update(registration: Registration): Observable<any> {

    console.log('add registration called ', registration);
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
    console.log('publish service ' + registration.name);
    registration.published = true;
    const url = `${environment.serviceProviderUrl}/service/v1/publish/${registration.id}`;

    return this.http.put(url, registration, this.createHeader());
  }

  unpublish(registration: Registration): Observable<any> {
    console.log('unpublish service ' + registration.name);
    registration.published = false;
    const url = `${environment.serviceProviderUrl}/service/v1/unpublish/${registration.id}`;

    return this.http.put(url, registration, this.createHeader());
  }

  getCategories(): Observable<any> {
    console.log('getCategories called');
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
