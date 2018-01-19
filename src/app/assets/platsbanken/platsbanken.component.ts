import {Component, OnInit} from '@angular/core';
import {MenuService} from '../../_services/menu.service';

@Component({
  selector: 'app-platsbanken',
  templateUrl: './platsbanken.component.html',
  styleUrls: ['./platsbanken.component.scss']
})
export class PlatsbankenComponent implements OnInit {

  constructor(private menuService: MenuService) {
  }

  ngOnInit() {
    this.menuService.activeRoute = 'Assets';
  }
}
