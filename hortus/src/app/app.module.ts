import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { initializeApp } from 'firebase/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyD1diP1N0ViVt5GB2YoVs-ZJGt93ndPQ7k",
  authDomain: "hortus-1685a.firebaseapp.com",
  databaseURL: "https://hortus-1685a-default-rtdb.firebaseio.com",
  projectId: "hortus-1685a",
  storageBucket: "hortus-1685a.firebasestorage.app",
  messagingSenderId: "1006176566816",
  appId: "1:1006176566816:web:48757fe6abc2f51fee0645",
  measurementId: "G-B50MTEPM33"
};

initializeApp(firebaseConfig);



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
