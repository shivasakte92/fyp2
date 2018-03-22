import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import * as firebase from "firebase";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, public router: Router) {}

  canActivate(

    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

    	if(firebase.auth().currentUser !== null) { 
      console.log(firebase.auth().currentUser);
    	return true; }

    	console.log("access denied");
    	this.router.navigate(['']);
    	return false;
  }
}
