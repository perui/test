import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {KeycloakService} from './keycloak/keycloak.service';

@Injectable()
export class UserService {

  constructor(public idp: KeycloakService) {

    // this.idp.client().onAuthLogout = () => {
    //   console.log('UserService onAuthLogout');
    // };
    //
    // this.idp.client().onAuthSuccess = () => {
    //   console.log('UserService onAuthSuccess');
    // };
    //
    // this.idp.client().onAuthRefreshSuccess = () => {
    //   console.log('UserService onAuthRefreshSuccess');
    // };
    //
    // this.idp.client().onAuthRefreshError = () => {
    //   console.log('UserService onAuthRefreshError');
    // };
    //
    // this.idp.client().onReady = (authenticated: boolean) => {
    //   console.log('UserService onReady authenticated', authenticated);
    // };
    //
    // this.idp.client().onTokenExpired = () => {
    //   console.log('UserService onTokenExpired');
    // };

  }

  public getUserJWT(): string {
    const token = this.idp.client().token;
    const tokenParsed = this.idp.client().tokenParsed;
    return tokenParsed.sub;
  }

}


