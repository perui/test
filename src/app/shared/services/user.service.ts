import { Injectable } from '@angular/core';
import { User } from '../model/user'

@Injectable()
export class UserService {

  user: User;

  constructor() {
  }

  isAuthenticated(): boolean {
    return this.user != null
  }

  isNotAuthenticated(): boolean {
    return !this.isAuthenticated();
  }

  signin(email: string, password: string) {
    console.log('sign up called')
    let promise = new Promise((resolve, reject) => {
      let dbUser = MOCK_USER_DATABASE.find(current => current.email === email)
      if (dbUser) {
        if(dbUser.password !== password){
          console.log('signin failed - password miss match')
          resolve(false)
        }
        this.user = dbUser;
        console.log('signin - calling MOCKED backend')
        resolve(true);
      } else {
        console.log('signin -  MOCKED backend did not find user')
        resolve(false);
      }
    })

    // let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20`;
    // this.http.get(apiURL)
    //   .toPromise()
    //   .then(
    //     res => { // Success
    //       console.log(res.json());
    //       resolve();
    //     }
    //   );
    return promise;
  }

  signup(name: string, email: string, password: string) {
    console.log('signin called')
    let promise = new Promise((resolve, reject) => {

      let dbUser = MOCK_USER_DATABASE.find(current => current.email === email)
      if (dbUser) {
        reject('The email is already regiserd')
      } else {
        this.user = <User>{ 'name': name, 'email': email, 'password': password, 'role': 'partner' };
        MOCK_USER_DATABASE.push(this.user);
        console.log('signup - added user to MOCKED backend', this.user);
        resolve();
      }
    });
    return promise;
  }

  signOut() {
    this.user = null;
  }
}


export const MOCK_USER_DATABASE: User[] = [
  {
    'name': 'Kalle',
    'email': 'kalle@jobtechdev.se',
    'password': 'qwerty',
    'role': 'partner'
  },
  {
    'name': 'Eva',
    'email': 'eva@jobtechdev.se',
    'password': 'qwerty',
    'role': 'admin'
  },
];