import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {KeycloakService} from './keycloak/keycloak.service';
import {environment} from '../../../environments/environment';


@Injectable()
export class UserService {

  constructor(public idp: KeycloakService) {

    if (environment.useKeycloak) {
      Observable.interval(30000)
        .subscribe(i => {
          if (this.idp.authenticated()) {
            this.idp.client().updateToken(30)
              .error(() => console.log('Failed to refresh the token, or the session has expired')
              );
          }
        });

      this.idp.client().onAuthSuccess = () => {
        console.log('onAuthSuccess');
      };
      this.idp.client().onAuthRefreshSuccess = () => {
        console.log('onAuthRefreshSuccess');
      };
      this.idp.client().onAuthRefreshError = () => {
        console.log('onAuthRefreshError');
      };
      this.idp.client().onReady = (authenticated) => {
        console.log('onReady ', authenticated);
      };
      this.idp.client().onTokenExpired = () => {
        console.log('onTokenExpired');
      };
    }
  }


}


