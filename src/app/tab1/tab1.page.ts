import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
//test up
  constructor(private alertController: AlertController) {
  }

  async agregarPendiente(){
    const alert = await this.alertController.create({
      header: 'Nuevo Pendiente',
      inputs: [
        {
          type: 'text',
          name: 'titulo',
          placeholder: 'Nombre del Pendiente'
      }
    ],
      buttons: [
        {
          text:'Cancelar',
          role:'cancel'
        },
        {
          text:'Crear',
          handler: (data)=> {
            if(data.titulo.length === 0){
              console.log('fallo');
            }
              return;
          }
        }
    ],
    });

    await alert.present();

  }

}
