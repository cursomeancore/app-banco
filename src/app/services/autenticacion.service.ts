import { Injectable, EventEmitter } from '@angular/core';

export enum TOKEN_TAG {
  CLIENTE = 'TOKEN_CLIENTE',
  GESTOR = 'TOKEN_GESTOR'
}

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private alertasCliente = new EventEmitter<boolean>();
  private alertasGestor = new EventEmitter<boolean>();

  set tokenGestor(token: string) {
    (!token) ? localStorage.removeItem(TOKEN_TAG.GESTOR) : localStorage.setItem(TOKEN_TAG.GESTOR, token);
  }

  get tokenGestor() {
    return localStorage.getItem(TOKEN_TAG.GESTOR);
  }

  set tokenCliente(token: string) {
    (!token) ? localStorage.removeItem(TOKEN_TAG.CLIENTE) : localStorage.setItem(TOKEN_TAG.GESTOR, token);
  }

  get tokenCliente() {
    return localStorage.getItem(TOKEN_TAG.CLIENTE);
  }

  constructor() {

    if (this.tokenCliente) {
      this.clienteAutenticado(this.tokenCliente);
    }

    if (this.tokenGestor) {
      this.gestorAutenticado(this.tokenGestor);
    }
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

  clienteAutenticado(token: string): void {
    this.tokenCliente = token;
    this.alertasCliente.emit(true);
  }

  clienteNoAutenticado(): void {
    this.alertasCliente.emit(false);
  }

  gestorAutenticado(token: string): void {
    this.tokenGestor = token;
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
    this.tokenCliente = null;
    this.tokenGestor = null;
    this.clienteNoAutenticado();
    this.gestorNoAutenticado();
  }
}
