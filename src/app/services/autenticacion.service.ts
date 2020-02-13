import { Injectable, EventEmitter } from '@angular/core';
import { TOKEN_TAG } from '../utils/http';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private alertasCliente = new EventEmitter<boolean>();
  private alertasGestor = new EventEmitter<boolean>();

  private tokenCliente: string;
  private tokenGestor: string;

  constructor() {

    this.tokenCliente = localStorage.getItem(TOKEN_TAG.CLIENTE);
    if (this.tokenCliente) {
      this.clienteAutenticado();
    }

    this.tokenGestor = localStorage.getItem(TOKEN_TAG.GESTOR);
    if (this.tokenGestor) {
      this.gestorAutenticado();
    }
  }

  getTokenCliente() {
    return this.tokenCliente;
  }

  getTokenGestor() {
    return this.tokenGestor;
  }

  setTokenCliente(token: string) {
    this.tokenCliente = token;
  }

  setTokenGestor(token: string) {
    this.tokenGestor = token;
  }

  estaClienteAutenticado(): boolean {
    return (this.tokenCliente) ? true : false;
  }

  estaGestorAutenticado(): boolean {
    return (this.tokenGestor) ? true : false;
  }

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

  logout() {
    localStorage.removeItem(TOKEN_TAG.CLIENTE);
    localStorage.removeItem(TOKEN_TAG.GESTOR);
    this.clienteNoAutenticado();
    this.gestorNoAutenticado();
  }
}
