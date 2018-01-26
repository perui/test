import {Component, OnInit} from '@angular/core';
import {MenuService} from '../shared/services/menu.service';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss']
})
export class PlatformComponent implements OnInit {

  constructor(private menuService: MenuService) {
  }

  ngOnInit() {
    this.menuService.activeRoute = 'Platform';
  }

}
