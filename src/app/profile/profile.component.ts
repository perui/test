import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service'
import {MenuService} from '../_services/menu.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private menuService: MenuService,
    private userService: UserService) { }

  ngOnInit() {
    this.menuService.activeRoute = 'My profile';
  }

}
