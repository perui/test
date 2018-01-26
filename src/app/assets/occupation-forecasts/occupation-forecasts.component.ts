import {Component, OnInit} from '@angular/core';
import {MenuService} from '../../shared/services/menu.service';

@Component({
  selector: 'app-occupation-forecasts',
  templateUrl: './occupation-forecasts.component.html',
  styleUrls: ['./occupation-forecasts.component.scss']
})
export class OccupationForecastsComponent implements OnInit {

  constructor(private menuService: MenuService) {
  }

  ngOnInit() {
    this.menuService.activeRoute = 'Assets';
  }

}
