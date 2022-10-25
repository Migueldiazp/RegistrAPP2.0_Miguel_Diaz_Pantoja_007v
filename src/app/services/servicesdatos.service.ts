import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { RegistrarPage } from '../pages/registrar/registrar.page';

export interface Datos{
  id: number;
  nombre: string 
  apellido: string;
  rut: string;
  correo: string;
  contraseña: string;
  tipo:string;
}

const ITEMS_KEY = 'my-datos';

@Injectable({
  providedIn: 'root'
})
export class ServicesdatosService {
  private _storage : Storage;

  constructor(private storage: Storage) { 
    this.init();
  }


  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
  }
//ingresar grabar, agregar un objeto
  async addDatos(dato: Datos):Promise<any>{
    return this.storage.get(ITEMS_KEY).then((datos : Datos[])=>{
      if(datos){
        datos.push(dato);
        return this.storage.set(ITEMS_KEY,datos);
      
      }else{
        return this.storage.set(ITEMS_KEY,[dato]);
      }
    })
  }

//leer datos

 getDatos():Promise<Datos[]>{
  return this.storage.get(ITEMS_KEY);
 }


  //actualizar un objeto del storage
  async updateDatos(dato: Datos):Promise<any>{
    return this.storage.get(ITEMS_KEY).then((datos: Datos[])=>{
      if(!datos || datos.length==0){
        return null;
      }
      let newDato: Datos[] = [];
      for (let i of datos){
        if(dato.id == i.id){
          newDato.push(dato);
        }
        else{
          newDato.push(i);
        }
      }
      this.storage.set(ITEMS_KEY, newDato);
     })
  }

// eliminar objeto
  async deleteDatos(id:number):Promise<Datos>{
    return this.storage.get(ITEMS_KEY).then((datos : Datos[])=>{
      if (!datos || datos.length == 0){
        return null;
      }
      let toKeep: Datos[] = []; 
      for (let i of datos){
        if (i.id !== id){
          toKeep.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, toKeep);
    });
  }


}
