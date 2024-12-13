import { Component, inject, OnInit } from '@angular/core';
import { Plantas } from 'src/app/models/plantas.model';
import { UtilsService } from 'src/app/services/utils.service';
import { UpdatePlantsComponent } from 'src/app/shared/components/update-plants/update-plants.component';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  utilsService = inject(UtilsService);
  firebaseService = inject(FirebaseService);
  plantas: Plantas[] = []; // Array para almacenar las plantas
  loading: boolean = true; // Indicador de carga



  ngOnInit() {
    this.getPlantas
  }

  async addUpdatePlants(plants?: Plantas) {
    let modal = await this.utilsService.getModal({
      component: UpdatePlantsComponent,
      cssClass: 'add-update-modal',
      componentProps: { plants }
    })
  }

  //mostrar plantas
  async getPlantas() {
    try {
      this.plantas = await this.firebaseService.getPlants();
      this.loading = false;
    } catch (error) {
      console.error('Error al cargar plantas:', error);
      this.loading = false;
    }
  }
  
  //editar eliminar
  editPlant(planta: Plantas) {
    console.log('Editar planta:', planta);
    // Lógica para editar la planta
  }
  
  deletePlant(planta: Plantas) {
    console.log('Eliminar planta:', planta);
    // Lógica para eliminar la planta
  }
}
