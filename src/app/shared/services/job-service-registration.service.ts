import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Registration} from '../model/registration';

@Injectable()
export class JobServiceRegistrationService {

  constructor() {
  }

  list(): Observable<Registration[]> {
    console.log('list called');
    return Observable.of(MOCK_DATABASE);
  }

  get(id: string): Observable<Registration> {
    console.log('list called');
    const registration = MOCK_DATABASE.find(current => current.id === id);
    if (registration) {
      console.log('found - registration ' + id);
      return Observable.of(registration);
    } else {
      console.log('signin -  MOCKED backend did not find user');
      return Observable.throw('Could not find registration id ' + id);
    }
  }

  add(registration): Observable<any> {
    console.log('list called');
    if (registration.id !== null) {
      return Observable.throw('The registration is already saved ' + registration.id);
    }
    registration.id = generateUUID();
    MOCK_DATABASE.push(registration);
    console.log('added - registration ' + registration.id);
    return Observable.of(true);
  }

  update(registration): Observable<any> {
    console.log('list called');
    const oldIndex = MOCK_DATABASE.findIndex(current => current.id === registration.id);
    if (oldIndex < 0) {
      return Observable.throw('No registration was found for id ' + registration.id);
    }

    MOCK_DATABASE.splice(oldIndex, 1, registration);
    console.log('updated - registration ' + registration.id);
    return Observable.of(true);
  }

  remove(registrationId): Observable<any> {
    console.log('removing service ' + registrationId);
    const index = MOCK_DATABASE.findIndex(current => current.id === registrationId);
    MOCK_DATABASE.splice(index, 1);
    console.log('removed - registration ' + registrationId);
    return Observable.of(true);
  }

  publish(registration): Observable<any> {
    console.log('publish service ' + registration.title);
    registration.published = true;
    return Observable.of(true);
  }

  unpublish(registration): Observable<any> {
    console.log('publish service ' + registration.title);
    registration.published = false;
    return Observable.of(true);
  }
}

function generateUUID() { // Public Domain/MIT
  let d = new Date().getTime();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now(); // use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}


export const MOCK_DATABASE: Registration[] = [
  {
    id: 'monster-id',
    title: 'Monster',
    description: 'En av Sveriges största aktörer',
    category: 'job-site',
    industry: ['All'],
    professions: ['Software Development', 'Project Management', 'IT Management'],
    competences: ['IT'],
    published: false,
    url: 'https://www.monster.se',
    logo: 'https://media.newjobs.com/global/img/header-m.png'
  },
  {
    id: 'idg-id',
    title: 'IDG-Job',
    description: 'En av Sveriges bästa aktörer',
    category: 'job-site',
    industry: ['IT'],
    professions: ['Software Development'],
    competences: ['Java', '.Net'],
    published: true,
    url: 'https://csjobb.idg.se',
    logo: 'https://csjobb.idg.se/assets/dist/images/logo.png'
  }
];
