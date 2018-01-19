import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-product-menu',
  templateUrl: './product-menu.component.html',
  styleUrls: ['./product-menu.component.scss']
})
export class ProductMenuComponent implements OnInit {

  @Input() selectedItem: string;

  constructor() {
  }

  ngOnInit() {
  }

  isSelected(item: string) {
    return this.selectedItem === item;
  }
}
