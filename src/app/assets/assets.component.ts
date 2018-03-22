import {Component, OnInit} from '@angular/core';
import {ContentService} from '../shared/services/content.service';
import {Itemm} from '../shared/model/item';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {

  items: Observable<Itemm[]>;

  constructor(private contentService: ContentService) {
    this.items = this.contentService.getAssets();
  }

  ngOnInit() {
  }



}
