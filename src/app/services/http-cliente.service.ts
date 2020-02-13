import { Observable, Subscriber } from 'rxjs';
import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { Transferencia } from '../models/transferencia';
import { InterfazCliente } from './../services-base/interfazCliente';
import { InterfazAutentication } from '../services-base/interfazAutenticacion';
import { OPTIONS } from '../utils/options';
import { Http } from '../utils/http';
import { ResponseHttp } from '../utils/responseHttp';

const SERVER = OPTIONS.SERVER;
const URL_LOGIN_CLIENTE = `${SERVER}/login/cliente/`;
const URL_OBTENER_INFO = `${SERVER}/cliente/`;
const URL_REALIZAR_INGRESO = `${SERVER}/cliente/ingreso/`;
const URL_CLIENTE_TRANSFERENCIA = `${SERVER}/cliente/transferencias/`;

@Injectable({
  providedIn: 'root'
})
export class HttpClienteService implements InterfazCliente, InterfazAutentication {
  private token: string;

  login(usuario: string, password: string): Observable<boolean> {

    const body = `usuario=${usuario}&password=${password}`;
    const headers: Headers = new Headers();
    headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    return new Observable((observer: Subscriber<boolean>) => {
      (async () => {
        try {

          const data = await Http.post(URL_LOGIN_CLIENTE, headers, body);
          const response = JSON.parse(data) as ResponseHttp<{ token: string }>;

          this.token = response.data.token;
          if (!response.ok) {
            observer.error(response.msg);
          }

          observer.next(true);
          observer.complete();

        } catch (err) {
          observer.error('Error interno del servidor');
        }
      })();
    });
  }

  isAuthenticated(): boolean {
    return (this.token) ? true : false;
  }

  obtenerInfo(): Observable<Cliente> {
    const headers: Headers = new Headers();
    headers.set('Authorization', `Basic ${this.token}`);

    return new Observable((observer: Subscriber<Cliente>) => {
      (async () => {
        try {

          const data = await Http.get(`${URL_OBTENER_INFO}`, headers);
          const response = JSON.parse(data) as ResponseHttp<Cliente>;

          if (!response.ok) {
            observer.error(response.msg);
          }

          observer.next(response.data);
          observer.complete();

        } catch (err) {
          observer.error('Error interno del servidor');
        }
      })();
    });
  }

  realizarIngreso(cantidad: number): Observable<string> {
    const headers: Headers = new Headers();
    headers.set('Authorization', `Basic ${this.token}`);

    return new Observable((observer: Subscriber<string>) => {
      (async () => {
        try {

          const data = await Http.get(`${URL_REALIZAR_INGRESO}${cantidad}`, headers);
          const response = JSON.parse(data) as ResponseHttp<object>;

          if (!response.ok) {
            observer.error(response.msg);
          }

          observer.next(null);
          observer.complete();

        } catch (err) {
          observer.error('Error interno del servidor');
        }
      })();
    });
  }

  obtenerTransferencias(): Observable<Transferencia[]> {
    const headers: Headers = new Headers();
    headers.set('Authorization', `Basic ${this.token}`);

    return new Observable((observer: Subscriber<Transferencia[]>) => {
      (async () => {
        try {

          const data = await Http.get(URL_CLIENTE_TRANSFERENCIA, headers);
          const response = JSON.parse(data) as ResponseHttp<Transferencia[]>;

          if (!response.ok) {
            observer.error(response.msg);
          }

          observer.next(response.data);
          observer.complete();

        } catch (err) {
          observer.error('Error interno del servidor');
        }
      })();
    });
  }

  obtenerTransferenciaPorId(id: number): Observable<Transferencia> {
    const headers: Headers = new Headers();
    headers.set('Authorization', `Basic ${this.token}`);

    return new Observable((observer: Subscriber<Transferencia>) => {
      (async () => {
        try {

          const data = await Http.get(`${URL_CLIENTE_TRANSFERENCIA}${id}`, headers);
          const response = JSON.parse(data) as ResponseHttp<Transferencia>;

          if (!response.ok) {
            observer.error(response.msg);
          }

          observer.next(response.data);
          observer.complete();

        } catch (err) {
          observer.error('Error interno del servidor');
        }
      })();
    });
  }

  realizarTransferencia(transferencia: Transferencia): Observable<string> {
    const headers: Headers = new Headers();
    headers.set('Authorization', `Basic ${this.token}`);
    const body = JSON.stringify(transferencia);

    return new Observable((observer: Subscriber<string>) => {
      (async () => {
        try {

          const data = await Http.post(URL_CLIENTE_TRANSFERENCIA, headers, body);
          const response = JSON.parse(data) as ResponseHttp<object>;

          if (!response.ok) {
            observer.error(response.msg);
          }

          observer.next(null);
          observer.complete();

        } catch (err) {
          observer.error('Error interno del servidor');
        }
      })();
    });
  }
}
