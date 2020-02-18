import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Gestor } from '../models/gestor';
import { Cliente } from '../models/cliente';
import { Mensaje } from '../models/mensaje';
import { Transferencia } from '../models/transferencia';
import { InterfazGestores } from './../services-base/interfazGestores';
import { InterfazMensajes } from './../services-base/interfazMensajes';
import { InterfazTransferencias } from './../services-base/interfazTransferencias';
import { InterfazClientes } from '../services-base/interfazClientes';
import { InterfazAutentication } from '../services-base/interfazAutenticacion';
import { OPTIONS } from '../utils/options';
import { HttpService, METODOS_HTTP } from './http.service';

const SERVER = OPTIONS.SERVER;
const URL_LOGIN_GESTOR = `${SERVER}/login/gestor/`;
const URL_GESTORES = `${SERVER}/gestores/`;
const URL_CLIENTES = `${SERVER}/clientes/`;
const URL_MENSAJES = `${SERVER}/mensajes/`;
const URL_MENSAJES_RECIBIDOS = `${SERVER}/mensajes/recibidos/`;
const URL_MENSAJES_ENVIADOS = `${SERVER}/mensajes/enviados/`;
const URL_TRANSFERENCIAS = `${SERVER}/transferencias/`;

@Injectable({
  providedIn: 'root'
})
export class HttpGestorService implements
  InterfazAutentication,
  InterfazClientes,
  InterfazGestores,
  InterfazMensajes,
  InterfazTransferencias {

  constructor(private httpService: HttpService) { }

  login(usuario: string, password: string): Observable<boolean> {
    return this.httpService.loginGestor(usuario, password, URL_LOGIN_GESTOR);
  }

  agregarGestor(gestor: Gestor): Observable<string> {
    return this.httpService.executeGestor<string>(URL_GESTORES, METODOS_HTTP.POST, null, JSON.stringify(gestor));
  }

  obtenerGestores(): Observable<Gestor[]> {
    return this.httpService.executeGestor<Gestor[]>(URL_GESTORES, METODOS_HTTP.GET);
  }

  obtenerGestorPorId(id: number): Observable<Gestor> {
    return this.httpService.executeGestor<Gestor>(`${URL_GESTORES}${id}`, METODOS_HTTP.GET);
  }

  obtenerGestorPorUsuario(usuario: string): Observable<Gestor> {
    return this.httpService.executeGestor<Gestor>(`${URL_GESTORES}${usuario}`, METODOS_HTTP.GET);
  }

  eliminarGestorPorUsuario(usuario: string): Observable<string> {
    return this.httpService.executeGestor<string>(`${URL_GESTORES}${usuario}`, METODOS_HTTP.DELETE);
  }

  eliminarGestorPorId(id: number): Observable<string> {
    return this.httpService.executeGestor<string>(`${URL_GESTORES}${id}`, METODOS_HTTP.DELETE);
  }

  agregarCliente(cliente: Cliente): Observable<string> {
    return this.httpService.executeGestor<string>(`${URL_CLIENTES}`, METODOS_HTTP.POST, null, JSON.stringify(cliente));
  }

  obtenerClientes(): Observable<Cliente[]> {
    return this.httpService.executeGestor<Cliente[]>(`${URL_CLIENTES}`, METODOS_HTTP.GET);
  }

  obtenerClientePorId(id: number): Observable<Cliente> {
    return this.httpService.executeGestor<Cliente>(`${URL_CLIENTES}${id}`, METODOS_HTTP.GET);
  }

  obtenerClientePorUsuario(usuario: string): Observable<Cliente> {
    return this.httpService.executeGestor<Cliente>(`${URL_CLIENTES}${usuario}`, METODOS_HTTP.GET);
  }

  eliminarClientePorUsuario(usuario: string): Observable<string> {
    return this.httpService.executeGestor<string>(`${URL_CLIENTES}${usuario}`, METODOS_HTTP.DELETE);
  }

  eliminarClientePorId(id: number): Observable<string> {
    return this.httpService.executeGestor<string>(`${URL_CLIENTES}${id}`, METODOS_HTTP.DELETE);
  }

  obtenerMensajes(): Observable<Mensaje[]> {
    return this.httpService.executeGestor<Mensaje[]>(`${URL_MENSAJES}`, METODOS_HTTP.GET);
  }

  obtenerMensajesRecibidosPorUsuario(usuario: string): Observable<Mensaje[]> {
    return this.httpService.executeGestor<Mensaje[]>(`${URL_MENSAJES_RECIBIDOS}`, METODOS_HTTP.GET);
  }

  obtenerMensajesEnviadosPorUsuario(usuario: string): Observable<Mensaje[]> {
    return this.httpService.executeGestor<Mensaje[]>(`${URL_MENSAJES_ENVIADOS}`, METODOS_HTTP.GET);
  }

  obtenerMensajePorId(id: number): Observable<Mensaje> {
    return this.httpService.executeGestor<Mensaje>(`${URL_MENSAJES}${id}`, METODOS_HTTP.GET);
  }

  enviarMensaje(mensaje: Mensaje): Observable<string> {
    return this.httpService.executeGestor<string>(`${URL_MENSAJES}`, METODOS_HTTP.POST, null, JSON.stringify(mensaje));
  }

  eliminarMensajes(): Observable<string> {
    return this.httpService.executeGestor<string>(`${URL_MENSAJES}`, METODOS_HTTP.DELETE);
  }

  eliminarMensajePorId(id: number): Observable<string> {
    return this.httpService.executeGestor<string>(`${URL_MENSAJES}${id}`, METODOS_HTTP.DELETE);
  }

  obtenerTransferencias(): Observable<Transferencia[]> {
    return this.httpService.executeGestor<Transferencia[]>(`${URL_TRANSFERENCIAS}`, METODOS_HTTP.GET);
  }

  obtenerTransferenciaPorId(id: number): Observable<Transferencia> {
    return this.httpService.executeGestor<Transferencia>(`${URL_TRANSFERENCIAS}${id}`, METODOS_HTTP.GET);
  }
}
