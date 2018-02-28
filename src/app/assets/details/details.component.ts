import {Component, OnInit,OnDestroy} from '@angular/core';
import {MenuService} from '../../shared/services/menu.service';
import {ContentService} from '../../shared/services/content.service';
import {Itemm} from '../../shared/model/item';
import {ActivatedRoute, Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit, OnDestroy {
  item: {};
  id: number;
  private sub: any;

  constructor(private route: ActivatedRoute, private contentService: ContentService) {

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number

      this.item=this.contentService.getAssetByName('name',this.id)

    });



  }
  ngOnInit() {

  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
