import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';


import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AuthService } from './auth.service';
import { HomeComponent } from './components/home/home.component';
import { UsercreationComponent } from './components/usercreation/usercreation.component';

const appRoutes: Routes = [
  {path:'home', component:HomeComponent, canActivate: [AuthGuard]},
  {path:'usercreation', component:UsercreationComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsercreationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, AuthGuard, AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
