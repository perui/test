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
  public joinRequestOrganisation: Organisation;
  public joinRequestMemberName: string;

  public edit: Organisation = new Organisation();
  public isCreateOrgCollapsed = true;
  public isJoinCollapsed = true;

  public members: Observable<User[]>;
  public pendingMembers: Observable<User[]>;
  private closeResult: string;
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

      this.hasAnOrganisation = null;
      this.myOrganisation = null;
      console.log('Can not load organisation: ', error);
      this.toastrService.error('Failed to load your organisation!');
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
    console.log('Organisation save: ', this.edit);
    this.orgService.update(this.edit).subscribe(
      saved => {
        console.log('Organisation was saved: ', saved);
        this.loadMyOrganisation();
        this.exitEditMode();
      },
      error => {
        console.log('Organisation failed to be saved: ', error);
        this.toastrService.error('Failed to create the organisation');
      }

    );
  }

  public cancel() {
    this.exitEditMode();
  }

  public delete() {
    this.orgService.delete(this.myOrganisation).subscribe(
      respond => {
        this.toastrService.info(`Delete the organisation: ${this.myOrganisation.name}`);
        this.loadMyOrganisation();

        this.closeDialog('Success to delete organisation');
      },
      error => {
        console.log('Failed to deltete the Organisation: ', error);
        this.toastrService.error('Failed to delete the organisation');
      }
    );
  }

  public createNewOrganisation() {
    console.log('createNewOrganisation, ', this.edit);
    this.orgService.create(this.edit).subscribe(
       saved => {
         console.log('Organisation was added: ', saved);
         this.loadMyOrganisation();
         this.closeDialog('User click');
       },
      error => {
        console.log('Organisation failed to be added: ', error);
        this.toastrService.error('Failed to create the organisation');
      }

    );
  }

  public sendJoinRequest() {

    console.log('sendJoinRequest, ', this.joinRequestOrganisation);
    this.orgService.requestMembership(this.joinRequestOrganisation).subscribe(
      response => {
        console.log('sendJoinRequestd: ', response);
        this.toastrService.info('Your request has been sent');
        this.closeDialog('User click');
      },
      error => {
        console.log('Organisation failed to be added: ', error);
        this.toastrService.error('Failed to create the organisation');
      }

    );
    this.closeDialog('User click');
  }

  public acceptMemberRequest(member: User) {

    this.orgService.acceptOrRejectOrganisationMember(this.myOrganisation, member, true).subscribe(
      response => {
        console.log('acceptMemberRequest: ', response);
        this.loadMyOrganisation();
      }, error => {
        console.log('Failed to accept member: ', error);
        this.toastrService.error('Failed to accept member');
      }
    );
  }

  public rejectMemberRequest(member: User) {
    this.orgService.acceptOrRejectOrganisationMember(this.myOrganisation, member, false).subscribe(
      response => {
        console.log('rejectMemberRequest: ', response);
        this.loadMyOrganisation();
      }, error => {
        console.log('Failed to reject member: ', error);
        this.toastrService.error('Failed to reject member');
      }
    );
  }

  public removeMember(member: User) {
    this.orgService.removeOrganisationMember(this.myOrganisation, member).subscribe(
      response => {
        console.log('removeMember: ', response);
        this.loadMyOrganisation();
      }, error => {
        console.log('Failed to remove member: ', error);
        this.toastrService.error('Failed to remove member');
      }
    );
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

  formatter = (org: Organisation) => org.name;

  typeaheadOrganisations = (text$: Observable<Organisation>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term =>
        this.orgService.findNameOrganisations(term)
          .do(response => console.log(`typeaheadOrganisations ${term} response:`, response))
          .catch((err) => {
            console.log(`typeaheadOrganisations ${term} err:`, err);
            return of([]);
          }))

}

export function ngbTypeaheadDefaultConfigFactory(): NgbTypeaheadConfig {
  const typeaheadConfig = new NgbTypeaheadConfig();
  typeaheadConfig.editable = false;
  return typeaheadConfig;
}
