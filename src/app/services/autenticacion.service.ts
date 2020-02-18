import { Injectable, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export enum TOKEN_TAG {
  CLIENTE = 'TOKEN_CLIENTE',
  GESTOR = 'TOKEN_GESTOR'
}

export enum USUARIO_TAG {
  CLIENTE = 'USUARIO_CLIENTE',
  GESTOR = 'USUARIO_GESTOR'
}

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private alertasCliente = new EventEmitter<boolean>();
  private alertasGestor = new EventEmitter<boolean>();

  constructor(private router: Router) {

    if (this.tokenCliente) {
      this.clienteAutenticado(this.usuarioCliente, this.tokenCliente);
    }

    if (this.tokenGestor) {
      this.gestorAutenticado(this.usuarioGestor, this.tokenGestor);
    }
  }

  estaClienteAutenticado(): boolean {
    return (this.tokenCliente) ? true : false;
  }

  estaGestorAutenticado(): boolean {
    return (this.tokenGestor) ? true : false;
  }

  clienteAutenticado(usuario: string, token: string): void {
    this.usuarioCliente = usuario;
    this.tokenCliente = token;
    this.alertasCliente.emit(true);
  }

  clienteNoAutenticado(): void {
    this.alertasCliente.emit(false);
  }

  gestorAutenticado(usuario: string, token: string): void {
    this.usuarioGestor = usuario;
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
    this.usuarioCliente = null;
    this.usuarioGestor = null;
    this.clienteNoAutenticado();
    this.gestorNoAutenticado();
    this.router.navigate(['/']);
  }

  set tokenGestor(token: string) {
    (!token) ? localStorage.removeItem(TOKEN_TAG.GESTOR) : localStorage.setItem(TOKEN_TAG.GESTOR, token);
  }

  get tokenGestor() {
    return localStorage.getItem(TOKEN_TAG.GESTOR);
  }

  set tokenCliente(token: string) {
    (!token) ? localStorage.removeItem(TOKEN_TAG.CLIENTE) : localStorage.setItem(TOKEN_TAG.CLIENTE, token);
  }

  get tokenCliente() {
    return localStorage.getItem(TOKEN_TAG.CLIENTE);
  }

  set usuarioGestor(usuario: string) {
    (!usuario) ? localStorage.removeItem(USUARIO_TAG.GESTOR) : localStorage.setItem(USUARIO_TAG.GESTOR, usuario);
  }

  get usuarioGestor() {
    return localStorage.getItem(USUARIO_TAG.GESTOR);
  }

  set usuarioCliente(usuario: string) {
    (!usuario) ? localStorage.removeItem(USUARIO_TAG.CLIENTE) : localStorage.setItem(USUARIO_TAG.CLIENTE, usuario);
  }

  get usuarioCliente() {
    return localStorage.getItem(USUARIO_TAG.CLIENTE);
  }
}
