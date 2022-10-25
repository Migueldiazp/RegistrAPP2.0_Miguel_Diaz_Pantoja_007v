import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { RegistroserviceService, Usuario } from '../../services/registroservice.service';
import { Platform, ToastController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {


  formularioRegistro: FormGroup;
  newUser: Usuario = <Usuario>{}


  constructor(private fb: FormBuilder,
              private alertController: AlertController,
              private toastController: ToastController,
              private registroserviceService:RegistroserviceService,
              private navController: NavController
                    
    ) {
    
    this.formularioRegistro = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'apellido': new FormControl("", Validators.required),
      'rut': new FormControl("", Validators.required),
      'correo': new FormControl("", Validators.required),
      'contraseña': new FormControl("", Validators.required),
      'tipo': new FormControl("", Validators.required)

    })

   }

  ngOnInit() {
  }

  async CrearUser(){
    var fm = this.formularioRegistro.value;
    this.newUser.nombre=fm.nombre;
    this.newUser.apellido=fm.apellido;
    this.newUser.rut=fm.rut;
    this.newUser.correo=fm.correo;
    this.newUser.contraseña=fm.contraseña;
    this.newUser.tipo=fm.tipo;
    this.registroserviceService.addUsuario(this.newUser).then(dato =>{
      this.newUser=<Usuario>{};
      this.creado();
      this.formularioRegistro.reset();
      this.navController.navigateRoot('login');
    })

  }
  

  async creado(){
    const alert = await this.alertController.create({
      header: 'Felicidades',
      message:   ' tu usuario ha sido creado con exito',
      buttons: ['Continuar']
    });
    await alert.present();
  }

}
