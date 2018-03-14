import { Injectable } from '@angular/core';
import {Itemm} from '../model/item';
import {Item} from '../model/item';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()

export class ContentService {

  constructor() { }


  getAssetByName( name ): Observable<any> {

    return Observable.of(ASSETS.find(current => current.name === name));
    // for (var i = 0; i < ASSETS.length; i++) {
    //   if (ASSETS[i][name] === value) {
    //     return ASSETS[i];
    //   }
    // }
    // return null;
  }



  getShowcases(): Observable<Item[]> {
    return Observable.of(SHOWCASES);
  }

  getAssets(): Observable<Itemm[]> {
    return Observable.of(ASSETS);
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

export const ASSETS = [
  {
    'name':'job-market-ontology',
    'title':'Job Market Ontology',
    'shortDescription':'Ontology created from job postings.(This is a prototype service, with full functionality)',
    'texts':[
      {
        'header':'Description',
        'description':'The job market is dynamical. It is an ongoing demand on new jobs and new competences.\nFor effective matching between employers and jobseekers a common language that the machines support is needed. \n\nJob market ontology is a project which uses modern technology to describe the job market for making more effective matching and better user experiences.\n\nThe ontology is created by automatically analysing 6.3 millions ads and extracting mentioned competencese. With intelligent algorithms the ontology knows how the competences is related to each other.',
      },
      {
        'header':'What does your competences relates to?',
        'description':'The first version of the Job market ontology consists of a limited set of competences. Here you can explore them and see how they relates to each other. \n\nThe state of the ontology is beta and it is changing to continuously get improved everyday.'
      }
    ],
    'image':'assets/images/jobb-rymden.png',
    'headimage':'assets/images/asset-header-ontologi.png',
    'externallinks':[
      {
        'name':'Go to API',
        'link':'http://pilot.arbetsformedlingen.se/ontology/v1/?url=swagger.json',
      },
      {
        'name':'Read more',
        'link':'http://ontologi.arbetsformedlingen.se/ontologi/#!/',
      }
    ],
    'files':[]
  },
  {
    'name':'occupation-forecasts',
    'title':'Occupation Forecasts',
    'shortDescription':'Short and long-term forecasts of labour demand for different occupations',
    'texts':[
      {
        'header':'Description',
        'description':'',
      },
      {
        'header':'test',
        'description':'test'
      }
    ],
    'image':'assets/images/dev-services-puff.jpg',
    'headimage':'assets/images/services-head.jpg',
    'files':[

    ]
  },
  {
    'name':'platsbanken',
    'title':'Platsbanken',
    'shortDescription':'All the current job postings available on Platsbanken',
    'texts':[
      {
        'header':'Description',
        'description':'API Platsbanken contains all current job ads. About 3000 new ads are sumitted daily by employers, 5 million accesses to the job posting database daily.With the API it is possible to interact with Arbetsförmedlingens job ad database with in custom built applications. The API is an open interface without contract or registration requirements. Some of the data returned from the service is of the type of fuzzy matching.This means that the results from a list search results in hits closely related keywords. Soft matching takes place in the professions and municipalities. Example of fuzzy matching: If you are looking for a "bagare" (baker), you also get hits for "Konditor" (confectioner) because these two occupations are closely related. See the technical description for more methods and requests',
      },
      {
        'header':'test',
        'description':'test'
      }
    ],
    'image':'assets/images/api-puff.jpg',
    'externallinks':[
      {
        'name':'Go to API',
        'link':'http://pilot.arbetsformedlingen.se/ontology/v1/?url=swagger.json',
      },
      {
        'name':'Read more',
        'link':'http://ontologi.arbetsformedlingen.se/ontologi/#!/',
      }
    ],
    'files':[
      {
        'name':'Technical description (Swe)',
        'url':'https://www.arbetsformedlingen.se/download/18.40fa4e7b159ff029331706ca/1486976282357/teknisk-beskrivning-lediga-jobb.pdf'
      },
      {
        'name':'License (Swe)',
        'url':'https://www.arbetsformedlingen.se/download/18.362b127c14924e08e871375/1415263305183/villkor_ledigajobb.pdf'
      }
    ]
  },
  {
    'name':'occupation',
    'title':'Occupation',
    'shortDescription':'Occupational description of 450 different occupations, with forecasts',
    'texts':[
      {
        'header':'Description',
        'description':'Occupation is a webservice, it contains descriptions of nearly 450 different occupations. The webservice is supposed to be used by anyone who wants to download texts and descriptions of one or more professions from the Profession A-Ö application.See the technical description for more information.',
      },
      {
        'header':'test',
        'description':'test'
      }
    ],
    'image':'assets/images/occupation-puff.jpg',
    'headimage':'assets/images/occupation-head.jpg',
    'externallinks':[
      {
        'name':'Go to API',
        'link':'http://pilot.arbetsformedlingen.se/ontology/v1/?url=swagger.json',
      },
      {
        'name':'Read more',
        'link':'http://ontologi.arbetsformedlingen.se/ontologi/#!/',
      }
    ],
    'files':[]
  },
  {
    'name':'historical-job-postings',
    'title':'Historical Job Postings',
    'shortDescription':'All job postings from Platsbanken 2006-2016',
    'texts':[
      {
        'header':'Description',
        'description':'This dataset consists of 4.2M job postings (7.7M job positions) published on Platsbanken from the year 2006 up to and including 2016. Texts have been anonymized with sentences including names, telephone numbers and email adresses removed.\nEach listing contains metadata on location, dates, employer name, job type and any additional job details.\nFor a visual overview of this dataset, please see the ',
      },
      {
        'header':'API with basic statistics',
        'description':'We provide a microservice for basic statistics and queries on the dataset. A notebook with examples can be found.\n\n Examples \n\n Data format \n Each line in a file contains a job listing in a JSON format '
      }
    ],
    'image':'assets/images/data-analysis-puff.jpg',
    'externallinks':[
      {
        'name':'Go to API',
        'link':'http://pilot.arbetsformedlingen.se/ontology/v1/?url=swagger.json',
      },
      {
        'name':'Read more',
        'link':'http://ontologi.arbetsformedlingen.se/ontologi/#!/',
      }
    ],
    'files':[
      {
        'name':'2006-2018',
        'url':'https://simonbe.blob.core.windows.net/afhistorik/pb2006_2017.zip',
      },
      {
        'name':'2006',
        'url':'https://simonbe.blob.core.windows.net/afhistorik/2006.zip'
      },
      {
        'name':'2007',
        'url':'https://simonbe.blob.core.windows.net/afhistorik/2007.zip'
      },
      {
        'name':'2008',
        'url':'https://simonbe.blob.core.windows.net/afhistorik/2008.zip'
      },
      {
        'name':'2009',
        'url':'https://simonbe.blob.core.windows.net/afhistorik/2009.zip'
      },
      {
        'name':'2010',
        'url':'https://simonbe.blob.core.windows.net/afhistorik/2010.zip'
      },
      {
        'name':'2011',
        'url':'https://simonbe.blob.core.windows.net/afhistorik/2011.zip'
      },
      {
        'name':'2012',
        'url':'https://simonbe.blob.core.windows.net/afhistorik/2012.zip'
      },
      {
        'name':'2013',
        'url':'https://simonbe.blob.core.windows.net/afhistorik/2013.zip'
      },
      {
        'name':'2014',
        'url':'https://simonbe.blob.core.windows.net/afhistorik/2014.zip'
      },
      {
        'name':'2015',
        'url':'https://simonbe.blob.core.windows.net/afhistorik/2015.zip'
      },
      {
        'name':'2016',
        'url':'https://simonbe.blob.core.windows.net/afhistorik/2016.zip'
      },
      {
        'name':'2017',
        'url':'https://simonbe.blob.core.windows.net/afhistorik/2017.zip'
      },
      {
        'name':'2018',
        'url':'https://simonbe.blob.core.windows.net/afhistorik/2018.zip'
      }

    ]
  }
];

