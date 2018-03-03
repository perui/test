import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

import { KeycloakService } from '../../shared/services/keycloak/keycloak.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  noTitleRoutes = ['Home'];

  isCollapsed = true;
  currentRoute: string;
  title;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public keycloakService: KeycloakService,
    private location: Location) {
  }


  static getHostUrl() {
    return window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
  }

  ngOnInit() {

    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      let newRoute;
      if (this.location.path() !== '') {
        newRoute = this.location.path();
      } else {
        newRoute = '/home';
      }
      this.onRouteChange(newRoute);
    });
    this.keycloakService.client().loadUserInfo();

  }

  doLogout() {
    console.log('doLogout');
    this.keycloakService.client().logout({redirectUri: NavbarComponent.getHostUrl()});
  }

  doLogin() {
    console.log('doLogin');
    this.keycloakService.client().login();
  }
  doRegister() {
    console.log('doRegister');
    this.keycloakService.client().register();
  }

  onRouteChange(newRoute: string) {
    newRoute = newRoute.replace(/^\/+/g, ''); // remove leading slashes
    console.log('newRoute: ', newRoute);
    if (this.currentRoute !== newRoute) {
      this.currentRoute = newRoute;
      console.log('currentRoute: ', this.currentRoute);
      this.processTitle();
    }
  }

  processTitle() {
    const route: string = this.currentRoute;
    const toIndex = route.indexOf('/') !== -1 ? route.indexOf('/') : route.length;
    this.title = route.charAt(0).toUpperCase() + route.slice(1, toIndex);
    if (this.noTitleRoutes.indexOf(this.title) !== -1) {
      this.title = '';
    }
    console.log('title: ', this.title);
  }

}
