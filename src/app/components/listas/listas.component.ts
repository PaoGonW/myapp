import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { Pendientes } from 'src/app/models/pendientes';
import { PendientesService } from 'src/app/services/pendientes.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  @Input() terminado!: boolean;
  @ViewChild(IonList) lista!: IonList;

  tareas: Pendientes[] = [];

  constructor(
    public servicio: PendientesService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.servicio.pendientes$.subscribe((pendientes) => {
      this.tareas = this.terminado
        ? pendientes.filter((lista) => lista.terminado)
        : pendientes.filter((lista) => !lista.terminado);
    });
  }

  listaSeleccionada(pendiente: Pendientes) {
    if (this.terminado) {
      this.popubExitoso();
    } else {
      this.router.navigateByUrl('/tabs/tab1/agregar/' + pendiente.id);
    }
  }

  async popubExitoso() {
    const alert = await this.alertController.create({
      header: 'Tarea Completada',
      buttons: [
        {
          text: 'Salir',
        },
      ],
    });
    await alert.present();
  }

  async editarPendiente(lista: Pendientes) {
    const alert = await this.alertController.create({
      header: 'Editar lista',
      inputs: [
        {
          type: 'text',
          name: 'titulo',
          value: lista.titulo,
          placeholder: 'Nombre del pendiente',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Actualizar',
          handler: (data) => {
            if (data.titulo.length === 0) {
              return;
            }
            lista.titulo = data.titulo;
            this.servicio.guardarStorage();
            this.lista.closeSlidingItems();
          },
        },
      ],
    });

    await alert.present();
  }

  borrarPendiente(pendiente: Pendientes) {
    this.servicio.borrarPendiente(pendiente);
  }
}
