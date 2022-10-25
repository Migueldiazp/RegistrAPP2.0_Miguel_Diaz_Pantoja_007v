import { Component, OnInit } from '@angular/core';
import { CalendarioService } from 'src/app/services/calendario.service';
import { datosFeriados } from 'src/app/interfaces/interfaz';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  dias:datosFeriados [] = [];

  constructor(private calendarioService:CalendarioService) { }

  ngOnInit() {
    this.calendarioService.getCalendarioFeriado().subscribe(resp =>{
      this.dias.push(...resp.data);
    })
  }

}
