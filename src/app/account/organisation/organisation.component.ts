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
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';

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

  public members: Observable<User[]>;
  public pendingMembers: Observable<User[]>;
  closeResult: string;
  private dialog: NgbModalRef;

  constructor(private orgService: OrganisationService,
              private keycloakService: KeycloakService,
              private modalService: NgbModal,
              private toastrService: ToastrService) { }

  ngOnInit() {
    this.loadMyOrganisation();
    this.joinRequestMemberName = this.keycloakService.client().tokenParsed['name'];
  }

  private loadMyOrganisation() {
    this.organisationAsync = this.orgService.getMyOrganisation();
    console.log('loadMyOrganisation');
    const sub = this.organisationAsync.subscribe(org => {
      console.log('organisationAsync ', org);
      this.hasAnOrganisation = org != null;
      this.myOrganisation = org;

      if (org != null) {
        this.members = this.orgService.findOrganisationMembers(org, true);
        this.pendingMembers = this.orgService.findOrganisationMembers(org, false);
      }
    }, error => {
      console.log('Can not load organisation: ', error);
    }, () => {
      console.log('getMyOrganisation done');
      // sub.unsubscribe();
    });



    // dummy data for dev.
    // this.myOrganisation = new Organisation();
    // this.myOrganisation.name = 'Monsters';
    // this.myOrganisation.email = 'info@monsters.se';
    // this.myOrganisation.joinRequestQueue = <User[]>[{name: 'Pär E'}, {name: 'David Druid'}, {name: 'Rickard Riddare'}];
    // this.myOrganisation.members = <User[]>[{name: 'Olle'}, {name: 'Eva'}];
    // this.hasAnOrganisation = true;
    // this.organisationAsync = Observable.of(this.myOrganisation);
  }

  protected enterEditMode() {
    this.editMode = true;
    this.edit = this.myOrganisation;
  }

  protected exitEditMode() {
    this.editMode = false;
  }

  protected save() {
    this.orgService.update(this.edit).subscribe(
      saved => {
        console.log('Organisation was saved: ', saved);
        this.myOrganisation = saved;
        this.hasAnOrganisation = saved != null;
        if (saved != null) {
          this.members = this.orgService.findOrganisationMembers(saved, true);
          this.pendingMembers = this.orgService.findOrganisationMembers(saved, false);
        }
        this.exitEditMode();
      },
      error => {
        console.log('Organisation failed to be saved: ', error);
        this.toastrService.error('Failed to create the organisation');
      }

    );
  }

  protected cancel() {
    this.exitEditMode();
  }

  protected delete() {
    this.orgService.delete(this.myOrganisation).subscribe(
      respond => {
        this.toastrService.info(`Delete the organisation: ${this.myOrganisation.name}`);
        this.myOrganisation = null;
        this.hasAnOrganisation = false;
        this.organisationAsync = this.orgService.getMyOrganisation();

        this.closeDialog('Success to delete organisation');
      },
      error => {
        console.log('Failed to deltete the Organisation: ', error);
        this.toastrService.error('Failed to delete the organisation');
      }
    );
  }

  protected createNewOrganisation() {
    this.orgService.create(this.edit).subscribe(
       saved => {
         console.log('Organisation was added: ', saved);
         this.myOrganisation = saved;
         this.hasAnOrganisation = saved != null;
         if (saved != null) {
           this.members = this.orgService.findOrganisationMembers(saved, true);
           this.pendingMembers = this.orgService.findOrganisationMembers(saved, false);
         }
         this.closeDialog('User click');
       },
      error => {
        console.log('Organisation failed to be added: ', error);
        this.toastrService.error('Failed to create the organisation');
      }

    );
  }

  protected sendJoinRequest() {

    this.closeDialog('User click');
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

  public openDialog(template) {
    this.dialog = this.modalService.open(template);
    this.dialog.result.then((result) => {
      console.log('dialog result closed, ', result);
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log('dialog result dismissed, ', reason);
    }).catch(result => {
      console.log('Failed to open dialog, ', result);
    });
  }

  public closeDialog(reason) {
    this.dialog.close(reason);
    this.exitEditMode();
  }

  public dismissDialog(reason) {
    this.dialog.dismiss(reason);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
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
