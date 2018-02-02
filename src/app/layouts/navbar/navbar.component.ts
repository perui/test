import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { MenuService } from '../../shared/services/menu.service';
import { UserService } from '../../shared/services/user.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  noTitleRoutes = ['Home', 'Signin', 'Signup', 'Signout']

  isCollapsed = true;
  isAccountCollapsed = true;
  currentRoute: string;
  title;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private menuService: MenuService,
    private userService: UserService,
    private location: Location) {
    // console.log('route:', route);
  }

  ngOnInit() {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let newRoute;
        if (this.location.path() != '') {
          newRoute = this.location.path();
        } else {
          newRoute = '/home'
        }
        this.onRouteChange(newRoute);
      }
    });

  }

  isHomePage() {
    return this.getActiveRoute() === 'Home';
  }

  getActiveRoute() {
    return this.menuService.activeRoute;
  }

  signOutUser() {
    console.log('signOutUser 1')
    this.userService.signOut()
    console.log('signOutUser 2')
    this.router.navigate(['/']);
    console.log('signOutUser 3')
  }

  onRouteChange(newRoute: string) {
    newRoute = newRoute.replace(/^\/+/g, ''); // remove leading slashes
    console.log("newRoute: ", newRoute)
    if (this.currentRoute != newRoute) {
      this.currentRoute = newRoute;
      console.log("currentRoute: ", this.currentRoute)
      this.processTitle();
    }
  }

  processTitle() {
    let route: string = this.currentRoute;
    let toIndex = route.indexOf('/') !== -1 ? route.indexOf('/') : route.length;
    this.title = route.charAt(0).toUpperCase() + route.slice(1, toIndex)
    if (this.noTitleRoutes.indexOf(this.title) != -1) {
      this.title = ''
    }
    console.log("title: ", this.title)
  }
}
