import {Component, OnInit} from '@angular/core';
import {MenuService} from '../_services/menu.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  constructor(private menuService: MenuService) {
  }

  ngOnInit() {
    this.menuService.activeRoute = 'News';
  }

}
