import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {KeycloakService} from './keycloak/keycloak.service';
import {Organisation} from '../model/organisation';
import {User} from '../model/user';
import {environment} from '../../../environments/environment';
import {Registration} from '../model/registration';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable()
export class OrganisationService {

  constructor(
    public idp: KeycloakService,
    private http: HttpClient) {
  }

  public getMyOrganisation(): Observable<Organisation> {
    return Observable.of(null);
  }

  public checkIfOrganisationNameIsAvailable(name: string): boolean {
    return true;
  }

  public findOrganisations(name: string): Observable<Organisation[]> {
    return null;
  }

  public create(organisation: Organisation): Observable<any>  {
    const url = `${environment.serviceProviderUrl}/organisation/v1/create`;
    return this.http.post(url, organisation, this.createHeader());
  }

  add(registration: Registration): Observable<any> {
    if (registration.id != null) {
      return Observable.throw('The registration is already saved ' + registration.id);
    }

    const url = `${environment.serviceProviderUrl}/service/v1/create`;
    return this.http.post(url, registration, this.createHeader());
  }

  public update(organisation: Organisation) {

  }

  public delete(organisation: Organisation) {

  }

  public requestMembership(organisation: Organisation) {

  }

  public acceptMembership(organisation: Organisation, userToAccept: User) {

  }

  findNameOrganisations(name): Observable<string[]> {
    return Observable.of(['Monster', 'CS Job']);
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


