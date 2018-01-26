import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MenuService} from '../../shared/services/menu.service';
import { UserService } from '../../shared/services/user.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isCollapsed = true;
  isAccountCollapsed = true;

  constructor(
    private route: ActivatedRoute, 
    private menuService: MenuService,
    private userService: UserService) {
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
