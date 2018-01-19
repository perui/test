import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MenuService} from '../_services/menu.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isCollapsed = true;

  constructor(route: ActivatedRoute, private menuService: MenuService) {
    console.log('route:', route);
  }

  ngOnInit() {
  }

  isHomePage() {
    return this.getActiveRoute() === 'Home';
  }

  getActiveRoute() {
    return this.menuService.activeRoute;
  }
}
