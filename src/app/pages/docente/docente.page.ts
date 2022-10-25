import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-docente',
  templateUrl: './docente.page.html',
  styleUrls: ['./docente.page.scss'],
})
export class DocentePage implements OnInit {

  constructor(private navController:NavController) { }

  ngOnInit() {
  }

  cerrarSesion(){
    localStorage.removeItem('ingresado');
    localStorage.removeItem('ingresado');
    this.navController.navigateRoot('login');
  }

}
