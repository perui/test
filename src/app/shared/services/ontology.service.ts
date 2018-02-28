import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class OntologyService {

  constructor() { }

  query(text: string): Observable<any> {
    // const url = `https://my.api.com/search?q=${text}`;
    // return this.http
    //   .get(url)
    //   .map(data => data.json());
    console.log('OntologyService query text:', text);
    return Observable.of([{display: 'Item1', value: 0}, 'item2', 'item3', 'Kalle']);
  }
}
