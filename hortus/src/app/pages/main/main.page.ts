import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  router = inject(Router);
  firebaseService = inject(FirebaseService);
  currentPath: string = ' ';

  pages = [
    {title:'Inicio', url:'/main/home', icon:'home-outline'},
    {title:'Perfil', url:'/main/profile', icon:'person-outline'}
  ]

  ngOnInit() {
    this.router.events.subscribe((event:any) => {
      if(event?.url) this.currentPath = event.url

    })
  
  }

  signOut() {
    this.firebaseService.signOut();
  }



}
