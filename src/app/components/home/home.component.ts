import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable }
  from 'angularfire2/database-deprecated';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

todos$: FirebaseListObservable<any[]>;

  constructor(private af: AngularFireDatabase) { }

  ngOnInit() {

  	let alphas: Array<any> = [];

    this.af.list('/orders', { preserveSnapshot: true })
    .subscribe(snapshots=>{
    
        snapshots.forEach(snapshot => {

          alphas.push(snapshot.val());

        });

        console.log(alphas);

    })

    this.todos$ = this.af.list('/orders');
    console.log(this.todos$);

  }

}
