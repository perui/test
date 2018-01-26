import {Component, OnInit} from '@angular/core';
import {MenuService} from '../shared/services/menu.service';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {

  constructor(private menuService: MenuService) {
  }

  ngOnInit() {
    this.menuService.activeRoute = 'Assets';
  }

}
