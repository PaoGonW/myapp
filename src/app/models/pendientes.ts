import { Tareas } from "./tareas";

export class Pendientes{

    id: number;
    titulo: string;
    fechaCreacion: Date;
    fechaTerminado?: Date;
    terminado: boolean;
    tareas: Tareas[];

    constructor(titulo: string){
        this.id = new Date().getTime()
        this.titulo = titulo;
        this.fechaCreacion = new Date();
        this.terminado = false;
        this.tareas = [];
    }


}