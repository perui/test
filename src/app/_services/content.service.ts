import { Injectable } from '@angular/core';
import {Item} from '../_model/item';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class ContentService {
   
  constructor() { }

  getShowcases(): Observable<Item[]> {
    return Observable.of(SHOWCASES);
  }
}

export const SHOWCASES = [
  { 'title':'Data Universe',
    'details':'Data Universe makes your data accessible and understandable by enabling dynamic exploration and visualization in a Virtual Reality space.', 
    'link':'https://data-universe.github.io/',
    'image':'assets/images/data-universe-puff.png',
    'type':'DATA-UNIVERSE'
  },
  { 'title':'Historical Data Analysis',
    'details':'Make smarter decisions with past data on job trends in various industry sectors', 
    'link':'http://historik.azurewebsites.net',
    'image':'assets/images/history-analysis-puff.jpg',
    'type':'APPLICATION'
  },
  { 'title':'Job Postings',
    'details':'Add Job postings list to your site in minutes.', 
    'link':'https://github.com/jobtechdev/vacancieswidget',
    'image':'assets/images/widget.png',
    'type':'VACANCIES WIDGET'
  },
  { 'title':'Post job ads',
    'details':'A SDK written in Ruby to validate and send job ads, developed by justarrived.se', 
    'link':'https://github.com/buren/arbetsformedlingen',
    'image':'assets/images/justarrived.png',
    'type':'POST JOB ADS'
  },
  { 'title':'Kompetensutforskaren',
    'details':'An example of how to use our Ontology API ', 
    'link':'http://pilot.arbetsformedlingen.se/kompetensutforskaren/#!/',
    'image':'assets/images/ontologi.png',
    'type':'KOMPETENSUTFORSKAREN'
  },
];
