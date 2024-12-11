import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Plantas } from 'src/app/models/plantas.model';

import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-update-plants',
  templateUrl: './update-plants.component.html',
  styleUrls: ['./update-plants.component.scss'],
})
export class UpdatePlantsComponent implements OnInit {

  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);

  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
    tiempoMaduracion: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required])


  })



  ngOnInit() {
  }

  async submit() {
    //if (this.form.valid) {
      //const loading = await this.utilsService.loading();

      //await loading.present();
      console.log(this.form.value);





    //}
  }

  async takeImage() {
    //estrae la reespuesta
    const dataUrl = (await this.utilsService.takePicture('Imagen de la planta')).dataUrl 
    this.form.controls.img.setValue(dataUrl)
  }

}



