import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service'
import {MenuService} from '../../shared/services/menu.service';

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
