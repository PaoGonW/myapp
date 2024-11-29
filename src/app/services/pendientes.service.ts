import { Injectable } from '@angular/core';
import { Pendientes } from '../models/pendientes';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PendientesService {
  private _pendientes = new BehaviorSubject<Pendientes[]>([]);
  pendientes$ = this._pendientes.asObservable(); 

  constructor() {
    this.cargarStorage();
  }

  crearPendiente(titulo: string) {
    const nuevoPendiente = new Pendientes(titulo);
    const pendientesActualizados = [...this._pendientes.value, nuevoPendiente];
    this._pendientes.next(pendientesActualizados);
    this.guardarStorage();
    return nuevoPendiente.id;
  }

  guardarStorage() {
    localStorage.setItem('datosPendientes', JSON.stringify(this._pendientes.value));
  }

  cargarStorage() {
    const data = localStorage.getItem('datosPendientes');
    if (data) {
      this._pendientes.next(JSON.parse(data));
    }
  }

  borrarPendiente(pendiente: Pendientes) {
    const pendientesActualizados = this._pendientes.value.filter(
      (item) => item.id !== pendiente.id
    );
    this._pendientes.next(pendientesActualizados);
    this.guardarStorage();
  }

  obtenerPendientePorId(id: any) {
    id = Number(id);
    let a: any;
    a = this._pendientes.value.find((data) => data.id === id);
    return a;
  }
}
