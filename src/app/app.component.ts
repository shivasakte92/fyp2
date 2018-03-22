import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable }
  from 'angularfire2/database-deprecated';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AngularFireDatabase]
})
export class AppComponent implements OnInit{
  title = 'app';
  email: string;
  password: string;

  todos$: FirebaseListObservable<any[]>;

  public realitem: Array<Object> = [];

  constructor(private router: Router, public authService: AuthService, private af: AngularFireDatabase) {}

  signup() {
    this.authService.signup(this.email, this.password);
    this.addTodo(this.email);
    this.email = this.password = '';
  }

  login(AngularFireDatabase) {

  	let alphas: Array<any> = [];

    this.af.list('/users', { preserveSnapshot: true })
    .subscribe(snapshots=>{
    
        snapshots.forEach(snapshot => {

          alphas.push(snapshot.val());

        });

        console.log(alphas);

    })

    for(var i=0; i<alphas.length; i++){

    if(alphas[i].content == this.email && alphas[i].roles == "admin"){

    this.authService.login(this.email, this.password);

    if (this.authService.login) { 

    return true; 

    }

    }

    console.log("you dont have access!");

    }

    this.email = this.password = '';    
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
    this.email = this.password = '';
   }

   ngOnInit() {

   	let alphas: Array<any> = [];

    this.af.list('/users', { preserveSnapshot: true })
    .subscribe(snapshots=>{
    
        snapshots.forEach(snapshot => {

          alphas.push(snapshot.val());

        });

        console.log(alphas);

    })

    this.todos$ = this.af.list('/users');
    console.log(this.todos$);
  }

  addTodo(email:string): void {
    this.todos$.push({ content: this.email, roles: "admin" });
  }

  deleteTodo(todo: any): void {
    // ...
  }

  toggleDone(todo: any): void {
    // ...
  }

  updateTodo(todo: any, newValue: string): void {
    // ...
  }

}
