import { Component, OnInit } from '@angular/core';
import {OrganisationService} from '../../shared/services/organisation.service';
import {Organisation} from '../../shared/model/organisation';
import {Observable} from 'rxjs/Observable';
import {User} from '../../shared/model/user';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/operator/switchMap';
import {of} from 'rxjs/observable/of';
import {NgbTypeaheadConfig} from '@ng-bootstrap/ng-bootstrap';
import {KeycloakService} from '../../shared/services/keycloak/keycloak.service';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.scss'],
  providers: [ {provide: NgbTypeaheadConfig, useFactory: ngbTypeaheadDefaultConfigFactory}]
})
export class OrganisationComponent implements OnInit {

  public organisationAsync: Observable<Organisation>;
  public myOrganisation: Organisation;
  public hasAnOrganisation = false;
  public editMode = false;
  public joinRequestOrganisationName: string;
  public joinRequestMemberName: string;

  public edit: Organisation = new Organisation();
  public isCreateOrgCollapsed = true;
  public isJoinCollapsed = true;

  constructor(private orgService: OrganisationService,
              private keycloakService: KeycloakService) { }

  ngOnInit() {
    this.loadMyOrganisation();
    this.joinRequestMemberName = this.keycloakService.client().tokenParsed['name'];
  }

  private loadMyOrganisation() {
    // this.organisationAsync = this.orgService.getMyOrganisation();
    // console.log('loadMyOrganisation');
    // const sub = this.organisationAsync.subscribe(org => {
    //   console.log('organisationAsync ', org);
    //   this.hasAnOrganisation = org != null;
    //   this.myOrganisation = org;
    // }, error => {
    //   console.log('Can not load organisation: ', error);
    // }, () => {
    //   // sub.unsubscribe();
    // });

    this.myOrganisation = new Organisation();
    this.myOrganisation.name = 'Monsters';
    this.myOrganisation.email = 'info@monsters.se';
    this.myOrganisation.joinRequestQueue = <User[]>[{name: 'Pär E'}];
    this.myOrganisation.members = <User[]>[{name: 'Olle'}, {name: 'Eva'}];
    this.hasAnOrganisation = true;
    this.organisationAsync = Observable.of(this.myOrganisation);
  }

  protected enterEditMode() {
    this.editMode = true;
    this.edit = this.myOrganisation;
  }

  protected exitEditMode() {
    this.editMode = false;
  }

  protected save() {
    this.exitEditMode();
  }

  protected cancel() {
    this.exitEditMode();
  }
  protected delete() {
    this.exitEditMode();
  }

  protected createNewOrganisation() {
    this.orgService.create(this.edit);
  }

  protected sendJoinRequest() {

  }

  protected acceptMemberRequest(user: User) {

  }

  protected rejectemberRequest(user: User) {

  }

  protected removeMember(user: User) {

  }

  public toggleCreateOrgCollapsed() {
    this.isCreateOrgCollapsed = !this.isCreateOrgCollapsed;
    this.isJoinCollapsed = true;
  }

  public toggleJoinCollapsed() {
    this.isJoinCollapsed = !this.isJoinCollapsed;
    this.isCreateOrgCollapsed = true;
  }

  typeaheadOrganisations = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term =>
        this.orgService.findNameOrganisations(term)
          .catch(() => {
            return of([]);
          }))

}

export function ngbTypeaheadDefaultConfigFactory(): NgbTypeaheadConfig {
  const typeaheadConfig = new NgbTypeaheadConfig();
  typeaheadConfig.editable = false;
  return typeaheadConfig;
}
