import {Component, OnInit} from '@angular/core';
import {MenuService} from '../_services/menu.service';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent implements OnInit {

  constructor(private menuService: MenuService) {
  }

  ngOnInit() {
    this.menuService.activeRoute = 'Showcase';
  }

}
