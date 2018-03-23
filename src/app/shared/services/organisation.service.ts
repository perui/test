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
    const userId = this.idp.client().tokenParsed.sub;
    const url = `${environment.serviceProviderUrl}/v1/organisation/member/${userId}`;
    return this.http.get<Organisation>(url, this.createHeader());
  }

  public checkIfOrganisationNameIsAvailable(name: string): boolean {
    return true;
  }

  public findOrganisations(name: string): Observable<Organisation[]> {
    return null;
  }

  public create(organisation: Organisation): Observable<Organisation>  {
    const url = `${environment.serviceProviderUrl}/v1/organisation`;
    return this.http.post<Organisation>(url, organisation, this.createHeader());
  }

  public update(organisation: Organisation) {
    const url = `${environment.serviceProviderUrl}/v1/organisation`;
    return this.http.put<Organisation>(url, organisation, this.createHeader());
  }

  public delete(organisation: Organisation) {
    const url = `${environment.serviceProviderUrl}/v1/organisation/${organisation.identifier}`;
    return this.http.delete<Organisation>(url, this.createHeader());
  }

  public requestMembership(organisation: Organisation) {

  }

  public acceptMembership(organisation: Organisation, userToAccept: User) {

  }

  findNameOrganisations(name): Observable<string[]> {
    return Observable.of(['Monster', 'CS Job']);
  }


  public findOrganisationMembers(organisation: Organisation, accepted: boolean): Observable<User[]> {
    const url = `${environment.serviceProviderUrl}/v1/organisation/${organisation.identifier}/members?accepted=${accepted}`;
    return this.http.get<User[]>(url, this.createHeader());
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


