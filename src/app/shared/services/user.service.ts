import { Injectable } from '@angular/core';
import { User } from '../model/user'

@Injectable()
export class UserService {

  logedin: Boolean = false;

  user: User;

  constructor() {
  }

  isAuthenticated():boolean {
    return this.user != null
  }

  isNotAuthenticated():boolean {
    return !this.isAuthenticated();
  }

  signin(email: string, password: string) {
    console.log('sign up called')
    let promise = new Promise((resolve, reject) => {
      let dbUser = MOCK_USER_DATABASE.find(current => current.email === email)
      if(dbUser){
        this.logedin = true;
        this.user = dbUser;
        console.log('signin - calling MOCKED backend')       
      } else {
        console.log('signin -  MOCKED backend did not find user')       
      }
      resolve(this.logedin);
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
      if(dbUser){
        reject('The email is already regiserd')
      } else {
        this.user = <User>{ 'name':name, 'email': email, 'password':password, 'role':'partner'};
        MOCK_USER_DATABASE.push(this.user);
      }
      this.logedin = true;;
      console.log('signup - added user to MOCKED backend', this.user);
      resolve(this.logedin);
    });
    return promise;
  }
}


export const MOCK_USER_DATABASE:User[] = [
  { 'name':'Kalle',
    'email':'kalle@jobtechdev.se', 
    'password':'qwerty',
    'role':'partner'
  },
  { 'name':'Eva',
    'email':'eva@jobtechdev.se', 
    'password':'qwerty',
    'role':'admin'
  },
];