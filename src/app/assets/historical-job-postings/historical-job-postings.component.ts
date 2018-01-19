import {Component, OnInit} from '@angular/core';
import {MenuService} from '../../_services/menu.service';

@Component({
  selector: 'app-historical-job-postings',
  templateUrl: './historical-job-postings.component.html',
  styleUrls: ['./historical-job-postings.component.scss']
})
export class HistoricalJobPostingsComponent implements OnInit {

  constructor(private menuService: MenuService) {
  }

  ngOnInit() {
    this.menuService.activeRoute = 'Assets';
  }

}
