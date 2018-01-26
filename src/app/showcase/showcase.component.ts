import {Component, OnInit} from '@angular/core';
import {MenuService} from '../shared/services/menu.service';
import {ContentService} from '../shared/services/content.service';
import {Item} from '../shared/model/item';
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent implements OnInit {

  items: Observable<Item[]>;

  constructor(private menuService: MenuService, private contentService: ContentService) {
    this.items = this.contentService.getShowcases()
    this.items.subscribe(items=>{
      items.map(item=>{
        console.log(item)
      })
      
    })
  }

  ngOnInit() {
    this.menuService.activeRoute = 'Showcase';
    
  }

  goToUrl(url): void {
    // window.location.href=url;
    window.open(url, "_blank");
  }

}
