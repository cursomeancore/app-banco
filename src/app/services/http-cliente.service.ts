import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { Transferencia } from '../models/transferencia';
import { InterfazCliente } from './../services-base/interfazCliente';
import { InterfazAutentication } from '../services-base/interfazAutenticacion';
import { OPTIONS } from '../utils/options';
import { HttpService, METODOS_HTTP } from './http.service';

const SERVER = OPTIONS.SERVER;
const URL_LOGIN_CLIENTE = `${SERVER}/login/cliente/`;
const URL_OBTENER_INFO = `${SERVER}/cliente/`;
const URL_REALIZAR_INGRESO = `${SERVER}/cliente/ingreso/`;
const URL_CLIENTE_TRANSFERENCIAS = `${SERVER}/cliente/transferencias/`;

@Injectable({
  providedIn: 'root'
})
export class HttpClienteService implements InterfazCliente, InterfazAutentication {

  constructor(protected httpService: HttpService) { }

  login(usuario: string, password: string): Observable<boolean> {
    return this.httpService.loginCliente(usuario, password, URL_LOGIN_CLIENTE);
  }

  obtenerInfo(): Observable<Cliente> {
    return this.httpService.executeCliente<Cliente>(URL_OBTENER_INFO, METODOS_HTTP.GET);
  }

  realizarIngreso(cantidad: number): Observable<string> {
    return this.httpService.executeCliente<string>(`${URL_REALIZAR_INGRESO}${cantidad}`, METODOS_HTTP.GET);
  }

  obtenerTransferencias(): Observable<Transferencia[]> {
    return this.httpService.executeCliente<Transferencia[]>(`${URL_CLIENTE_TRANSFERENCIAS}`, METODOS_HTTP.GET);
  }

  obtenerTransferenciaPorId(id: number): Observable<Transferencia> {
    return this.httpService.executeCliente<Transferencia>(`${URL_CLIENTE_TRANSFERENCIAS}${id}`, METODOS_HTTP.GET);
  }

  realizarTransferencia(transferencia: Transferencia): Observable<string> {
    return this.httpService
      .executeCliente<string>(`${URL_CLIENTE_TRANSFERENCIAS}`, METODOS_HTTP.POST, null, JSON.stringify(transferencia));
  }
}
