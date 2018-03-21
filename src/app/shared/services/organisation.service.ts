import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {KeycloakService} from './keycloak/keycloak.service';
import {Organisation} from '../model/organisation';
import {User} from '../model/user';


@Injectable()
export class OrganisationService {

  constructor(public idp: KeycloakService) {
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

  public create(organisation: Organisation): number {
    return null;
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
}


