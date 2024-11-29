import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { PendientesService } from '../services/pendientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private alertController: AlertController,
    private servicio: PendientesService,
    private route: Router
  ) {
    servicio.cargarStorage();
  }

  async agregarPendiente() {
    const alert = await this.alertController.create({
      header: 'Nuevo pendiente',
      inputs: [
        {
        type:'text',
        name: 'titulo',
        placeholder:'nombre del pendiente'
      }
      ],
      buttons: [
        {
          text:'Cancelar',
          role: 'cancel'

        },
        { 
          text:'Crear',
          handler: (data) => {
            if(data.titulo.length ===0){
              return;
            }
            const i = this.servicio.crearPendiente(data.titulo);
            this.servicio.cargarStorage();
            this.route.navigateByUrl(`/tabs/tab1/agregar/${i}`)
          }
        }
      ],
    });

    await alert.present();

  }

}
