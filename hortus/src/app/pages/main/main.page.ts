import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  router = inject(Router);
  currentPath: string = ' ';

  pages = [
    {title:'Inicio', url:'/main/home', icon:'home-outline'},
    {title:'Perfil', url:'/main/profile', icon:'person-outline'}
  ]

  ngOnInit() {
    this.router.events.subscribe((event:any) => {
      if(event?.url) this.currentPath = event.url

    })
    console.log(this.pages)


  }



}
