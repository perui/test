import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Registration} from '../model/registration';
import {environment} from '../../../environments/environment';
import {KeycloakService} from './keycloak/keycloak.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from './user.service';
import {HttpResponse} from '@angular/common/http/src/response';

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
    const token = this.idp.client().token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`
      })
    };


    return  this.http.get<Registration[]>(url, httpOptions);
  }

  get(registrationId: string): Observable<Registration> {
    console.log('list called');

    const url = `${environment.serviceProviderUrl}/service/v1/${registrationId}`;
    const token = this.idp.client().token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`
      })
    };


    return this.http.get<Registration>(url, httpOptions);

    //
    // const registration = MOCK_DATABASE.find(current => current.id === id);
    // if (registration) {
    //   console.log('found - registration ' + id);
    //   return Observable.of(registration);
    // } else {
    //   console.log('signin -  MOCKED backend did not find user');
    //   return Observable.throw('Could not find registration id ' + id);
    // }
  }

  add(registration: Registration): Observable<any> {

    console.log('add registration called ', registration);
    if (registration.id != null) {
      return Observable.throw('The registration is already saved ' + registration.id);
    }

    const url = `${environment.serviceProviderUrl}/service/v1/create`;
    const token = this.idp.client().token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.post(url, registration, httpOptions);
  }

  update(registration: Registration): Observable<any> {

    console.log('add registration called ', registration);
    if (registration.id == null) {
      return Observable.throw('The registration is not saved ' + registration.id);
    }

    const url = `${environment.serviceProviderUrl}/service/v1/update`;
    const token = this.idp.client().token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.put(url, registration, httpOptions);
  }

  remove(registrationId): Observable<any> {
    const url = `${environment.serviceProviderUrl}/service/v1/${registrationId}`;
    const token = this.idp.client().token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`
      })
    };


    return this.http.delete(url, httpOptions);
  }

  publish(registration: Registration): Observable<any> {
    console.log('publish service ' + registration.name);
    registration.published = true;
    const url = `${environment.serviceProviderUrl}/service/v1/publish/${registration.id}`;
    const token = this.idp.client().token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.put(url, registration, httpOptions);
  }

  unpublish(registration: Registration): Observable<any> {
    console.log('unpublish service ' + registration.name);
    registration.published = false;
    const url = `${environment.serviceProviderUrl}/service/v1/unpublish/${registration.id}`;
    const token = this.idp.client().token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.put(url, registration, httpOptions);
  }

}
