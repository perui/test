import {Component} from '@angular/core';
import {KeycloakService} from '../../shared/services/keycloak/keycloak.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor(public idp: KeycloakService) {
  }

  doEditProfile() {
    this.idp.client().accountManagement()
      .success(() => console.log('accountManagement ok'))
      .error(error => console.log('accountManagement error', error));
  }
}
