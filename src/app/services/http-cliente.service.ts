import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { Transferencia } from '../models/transferencia';
import { InterfazCliente } from './../services-base/interfazCliente';
import { InterfazAutentication } from '../services-base/interfazAutenticacion';
import { OPTIONS } from '../utils/options';
import { AutenticacionService } from './autenticacion.service';
import { Http, METODOS_HTTP, TOKEN_TAG } from '../utils/http';

const SERVER = OPTIONS.SERVER;
const URL_LOGIN_CLIENTE = `${SERVER}/login/cliente/`;
const URL_OBTENER_INFO = `${SERVER}/cliente/`;
const URL_REALIZAR_INGRESO = `${SERVER}/cliente/ingreso/`;
const URL_CLIENTE_TRANSFERENCIA = `${SERVER}/cliente/transferencias/`;

const TOKEN_CLIENTE = 'TOKEN_CLIENTE';

@Injectable({
  providedIn: 'root'
})
export class HttpClienteService extends Http implements InterfazCliente, InterfazAutentication {

  constructor(protected autenticacionService: AutenticacionService) {
    super(autenticacionService, TOKEN_TAG.CLIENTE);
  }

  login(usuario: string, password: string): Observable<boolean> {
    return super.login(usuario, password, URL_LOGIN_CLIENTE);
  }

  obtenerInfo(): Observable<Cliente> {
    return this.execute<Cliente>(URL_OBTENER_INFO, METODOS_HTTP.GET);
  }

  realizarIngreso(cantidad: number): Observable<string> {
    return this.execute<string>(`${URL_REALIZAR_INGRESO}${cantidad}`, METODOS_HTTP.POST);
  }

  obtenerTransferencias(): Observable<Transferencia[]> {
    return this.execute<Transferencia[]>(`${URL_CLIENTE_TRANSFERENCIA}`, METODOS_HTTP.GET);
  }

  obtenerTransferenciaPorId(id: number): Observable<Transferencia> {
    return this.execute<Transferencia>(`${URL_CLIENTE_TRANSFERENCIA}${id}`, METODOS_HTTP.GET);
  }

  realizarTransferencia(transferencia: Transferencia): Observable<string> {
    return this.execute<string>(`${URL_CLIENTE_TRANSFERENCIA}$`, METODOS_HTTP.GET, null, JSON.stringify(transferencia));
  }
}
