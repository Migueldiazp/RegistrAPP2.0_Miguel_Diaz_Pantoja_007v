import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { estado } from '../interfaces/interfaz';


@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  constructor(private httClient: HttpClient) {

  }

  getCalendarioFeriado() {
    return (this.httClient.get<estado>('https://api.victorsanmartin.com/feriados/en.json'));
  }
}
