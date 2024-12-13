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
    riego: new FormControl('', [Validators.required]),
    ubicacion: new FormControl('', [Validators.required]),
    fecha: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required])


  })



  ngOnInit() {
  }

  async guardarPlanta() {
    if (this.form.valid) {
      try {
        const imageUrl = this.form.value.img; // Obtén la URL de la imagen desde el formulario

        // 1. Guarda la imagen en Realtime Database
        const imageResult = await this.firebaseService.saveImageToRealtimeDatabase(imageUrl);
        console.log('Imagen guardada en Realtime Database:', imageResult.key);

        // 2. Guarda los datos del formulario en Firestore
        const planta = this.form.value; 
        const firestoreResult = await this.firebaseService.addDocumentToFirestore('plantas', planta);
        console.log('Planta guardada en Firestore:', firestoreResult.id);

        this.form.reset(); // Limpia el formulario
      } catch (error) {
        console.error('Error al guardar la planta o la imagen:', error);
      }
    } else {
      console.error('Formulario no válido');
    }
  }

  // Captura la imagen usando el servicio utils.service.ts
  async takeImage() {
    try {
      const image = await this.utilsService.takePicture('Selecciona una foto');
      const imageUrl = await this.firebaseService.saveImageToRealtimeDatabase(image.dataUrl);
      this.form.controls['img'].setValue(image.dataUrl); // Guardar el DataUrl en el formulario
    } catch (error) {
      console.error('Error al capturar la imagen:', error);
    }
  }

}



