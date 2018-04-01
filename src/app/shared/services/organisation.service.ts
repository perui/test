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

  private ws;

  constructor(
    public idp: KeycloakService,
    private http: HttpClient) {
    this.ws = environment.serviceProviderUrl;
  }

  public getMyOrganisation(): Observable<Organisation> {
    const userId = this.idp.client().tokenParsed.sub;
    const url = `${this.ws}/organisation/v1/member/${userId}`;
    return this.http.get<Organisation>(url, this.createHeader());
  }

  public checkIfOrganisationNameIsAvailable(name: string): boolean {
    return true;
  }

  public create(organisation: Organisation): Observable<Organisation>  {
    const url = `${this.ws}/organisation/v1`;
    return this.http.post<Organisation>(url, organisation, this.createHeader());
  }

  public update(organisation: Organisation) {
    const url = `${this.ws}/organisation/v1`;
    return this.http.put<Organisation>(url, organisation, this.createHeader());
  }

  public delete(organisation: Organisation) {
    const url = `${this.ws}/organisation/v1/${organisation.identifier}`;
    return this.http.delete<Organisation>(url, this.createHeader());
  }

  public requestMembership(organisation: Organisation) {
    const url = `${this.ws}/organisation/v1/${organisation.identifier}/join-request`;
    const userRequest = {
        name: this.idp.client().tokenParsed['name'],
        keycloakId: this.idp.client().tokenParsed.sub
    };
    console.log('requestMembership: ', organisation, userRequest);
    return this.http.post(url, userRequest, this.createHeader());
  }

  findNameOrganisations(name): Observable<any> {
    const url = `${this.ws}/organisation/v1/find?name=${name}`;
    return this.http.get<User[]>(url, this.createHeader());
  }


  public findOrganisationMembers(organisation: Organisation, accepted: boolean): Observable<User[]> {
    const url = `${this.ws}/organisation/v1/${organisation.identifier}/members?accepted=${accepted}`;
    return this.http.get<User[]>(url, this.createHeader());
  }

  public acceptOrRejectOrganisationMember(organisation: Organisation, member: User, accepted: boolean): Observable<any> {
    const url = `${this.ws}/organisation/v1/${organisation.identifier}/member-accept/${member.keycloakId}?accepted=${accepted}`;
    return this.http.put(url, '', this.createHeader());
  }

  public removeOrganisationMember(organisation: Organisation, member: User): Observable<any> {
    const url = `${this.ws}/organisation/v1/${organisation.identifier}/member/${member.keycloakId}`;
    return this.http.delete(url, this.createHeader());
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


