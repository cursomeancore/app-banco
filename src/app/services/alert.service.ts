import { Injectable, EventEmitter } from '@angular/core';
import { Alerta } from '../data/alerta';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertas = new EventEmitter<Alerta>();

  enviarAlerta(alerta: Alerta): void {
    this.alertas.emit(alerta);
  }

  getAlertas(): EventEmitter<Alerta> {
    return this.alertas;
  }
}
