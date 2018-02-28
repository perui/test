import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class OntologyService {

  constructor(
    private http: HttpClient) { }

  professions(text: string): Observable<any> {
    return Observable.of([
      'Administration, ekonomi, juridik',
      'Bygg och anläggning',
      'Chefer och verksamhetsledare',
      'Data/IT',
      'Försäljning, inköp, marknadsföring',
      'Hantverksyrken',
      'Hotell, restaurang, storhushåll',
      'Hälso- och sjukvård',
      'Industriell tillverkning',
      'Installation, drift, underhåll',
      'Kropps- och skönhetsvård',
      'Kultur, media, design',
      'Militärt arbete',
      'Naturbruk',
      'Naturvetenskapligt arbete',
      'Pedagogiskt arbete',
      'Sanering och renhållning',
      'Socialt arbete',
      'Säkerhetsarbete',
      'Tekniskt arbete',
      'Transport']);
  }

  competences(text: string): Observable<any> {
    const url = `http://ontologi.arbetsformedlingen.se/ontology/v1/concept?limit=10&filter=${text}`;
    return this.http
      .get(url)
      .map((data: Array<string>) => data.map((row: any) => row.name));
  }


}
