import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private alertasCliente = new EventEmitter<boolean>();
  private alertasGestor = new EventEmitter<boolean>();

  constructor() { }

  clienteAutenticado(): void {
    this.alertasCliente.emit(true);
  }

  clienteNoAutenticado(): void {
    this.alertasCliente.emit(false);
  }

  gestorAutenticado(): void {
    this.alertasGestor.emit(true);
  }

  gestorNoAutenticado(): void {
    this.alertasGestor.emit(false);
  }

  getAlertasCliente(): EventEmitter<boolean> {
    return this.alertasCliente;
  }

  getAlertasGestor(): EventEmitter<boolean> {
    return this.alertasGestor;
  }
}
