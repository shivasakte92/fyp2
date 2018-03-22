import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router, CanActivate } from '@angular/router';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
user: Observable<firebase.User>;

  constructor(private router: Router, public firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }

  get authenticated(): boolean {
    return this.firebaseAuth !== null;
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });    
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        this.router.navigate(['/home']);
        console.log('Nice, it worked!');
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }

}
