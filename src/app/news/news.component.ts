import {Component, OnInit, AfterViewInit} from '@angular/core';
import {MenuService} from '../shared/services/menu.service';
import {Itemm} from '../shared/model/item';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, AfterViewInit {

  constructor(
      private menuService: MenuService) {
  }

  ngOnInit() {
    this.menuService.activeRoute = 'News';
  }

  ngAfterViewInit () {
    !function(d,s,id){
        var js: any,
            fjs=d.getElementsByTagName(s)[0],
            p='https';
        if(!d.getElementById(id)){
            js=d.createElement(s);
            js.id=id;
            js.src=p+"://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js,fjs);
        }
    }
    (document,"script","twitter-wjs");
}
}
