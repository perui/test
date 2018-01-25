import { Injectable } from '@angular/core';
import { User } from '../_model/user'

@Injectable()
export class UserService {

  logedin: Boolean = false;

  user: User;

  constructor() {
  }

  signin(email: string, password: string) {
    console.log('signin called')
    let promise = new Promise((resolve, reject) => {

      this.logedin = true;
      this.user = <User>{ 'email': email };
      console.log('signin - calling MOCKED backend')
      resolve(this.logedin);
      // let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20`;
      // this.http.get(apiURL)
      //   .toPromise()
      //   .then(
      //     res => { // Success
      //       console.log(res.json());
      //       resolve();
      //     }
      //   );
    });
    return promise;
  }
}