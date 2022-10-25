import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServicesdatosService}  from '../../services//servicesdatos.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  constructor(private navController:NavController,private servicesdatosService:ServicesdatosService) { }

  ngOnInit() {
  }

  cerrarSesion(){
    localStorage.removeItem('ingresado');
    localStorage.removeItem('ingresado');
    this.navController.navigateRoot('login');
    
  }

}
