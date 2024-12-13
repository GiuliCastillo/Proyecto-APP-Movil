import { Component, inject, OnInit } from '@angular/core';
import { Plantas } from 'src/app/models/plantas.model';
import { UtilsService } from 'src/app/services/utils.service';
import { UpdatePlantsComponent } from 'src/app/shared/components/update-plants/update-plants.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  utilsService = inject(UtilsService);



  ngOnInit() {
  }

  async addUpdatePlants(plants?: Plantas) {
    let modal = await this.utilsService.getModal({
      component: UpdatePlantsComponent,
      cssClass: 'add-update-modal',
      componentProps: { plants }
    })
  }

  
}
