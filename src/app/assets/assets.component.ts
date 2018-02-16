import {Component, OnInit} from '@angular/core';
import {MenuService} from '../shared/services/menu.service';
import {ContentService} from '../shared/services/content.service';
import {Itemm} from '../shared/model/item';
import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {

  items: Observable<Itemm[]>;

  constructor(private menuService: MenuService, private contentService: ContentService) {
    this.items = this.contentService.getAssets()

    this.items.subscribe(items=>{
      items.map(itemm=>{

      })

    })
  }



  ngOnInit() {
    this.menuService.activeRoute = 'Assets';

  }



}
