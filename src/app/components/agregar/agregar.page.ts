import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pendientes } from 'src/app/models/pendientes';
import { Tareas } from 'src/app/models/tareas';
import { PendientesService } from 'src/app/services/pendientes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  nombreTarea = "";
  lista: Pendientes = new Pendientes('');
  
  constructor( private servicio: PendientesService,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.lista = this.servicio.obtenerPendientePorId(id);
  }

  agregarTarea(){
    if(this.nombreTarea.length=== 0){
      return;
    }

    const nuevaTarea = new  Tareas(this.nombreTarea);
    this.lista.tareas.push(nuevaTarea);

    this.nombreTarea = '';
    this.servicio.guardarStorage();

  }

  cambioCheck(item: Tareas){

    const pendiente = this.lista.tareas.filter(data => !data.completado).length;

    if(pendiente === 0){
      this.lista.terminado = true;
      this.lista.fechaTerminado = new Date();

    } else{
      this.lista.terminado = false;
      this.lista.fechaTerminado = undefined;
    }

    this.servicio.guardarStorage();
    this.servicio.cargarStorage();

  }

  borrar(index: number){
    this.lista.tareas.splice(index,1);
    this.servicio.guardarStorage();

  }

}
