import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MenuService} from '../_services/menu.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(route: ActivatedRoute, private menuService: MenuService) {
    console.log('route:', route);
  }

  ngOnInit() {
  }

  getActiveRoute() {
    return this.menuService.activeRoute;
  }
}
