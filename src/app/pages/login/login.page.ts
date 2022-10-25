import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { RegistroserviceService, Usuario } from '../../services//registroservice.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;
  user : Usuario[] = [];
  nombre: string;
  apellido: string;


  constructor(private alertController: AlertController, 
    private navController: NavController,
    private registroserviceService:RegistroserviceService,
    private fb: FormBuilder) {
    
    this.formularioLogin = this.fb.group({
      'correo': new FormControl("", Validators.required),
      'contraseña': new FormControl("", Validators.required)
    })

   }

  ngOnInit() {
  }

  async Ingresar(){
    var f = this.formularioLogin.value;
    var a=0;
    this.registroserviceService.getUsuarios().then(datos=>{ 
      this.user = datos; 
      if (!datos || datos.length==0){
        return null;
      }
      for (let obj of this.user){
        this.nombre=obj.nombre;
        this.apellido=obj.apellido;
        
        if (f.correo == obj.correo && f.contraseña==obj.contraseña){
          a=1;
          console.log('ingresado');
          localStorage.setItem('ingresado','true');
        
          this.Bienvenido();
          this.formularioLogin.reset();
          if(obj.tipo=='alumno'){
            localStorage.setItem('tipo', obj.tipo)
          this.navController.navigateRoot('alumno');
          }
          else{
            localStorage.setItem('tipo', obj.tipo)
            this.navController.navigateRoot('docente');
          }
        }
      }//findelfor
      if(a==0){
        this.alertMsg();
        this.formularioLogin.reset();
      }
    })
  }//findelmetodo

  async alertMsg(){
    const alert = await this.alertController.create({
      header: 'ERROR',
      message: 'DATOS INCORRECTOS',
      buttons: ['Aceptar']
    })
    await alert.present();
    return;
  }
  async Bienvenido(){
    const alert = await this.alertController.create({
      header: 'RegristrAPP',
      message: 'Bienvenido(a)'+' '+this.nombre + ' ' + this.apellido,
      buttons: ['Continuar']
    });
    await alert.present();
  }

}
