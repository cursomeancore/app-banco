import { Observable, Subscriber, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Gestor } from '../models/gestor';
import { Cliente } from '../models/cliente';
import { Mensaje } from '../models/mensaje';
import { Transferencia } from '../models/transferencia';
import { InterfazCliente } from './../services-base/interfazCliente';
import { InterfazGestores } from './../services-base/interfazGestores';
import { InterfazMensajes } from './../services-base/interfazMensajes';
import { InterfazTransferencias } from './../services-base/interfazTransferencias';
import { InterfazClientes } from '../services-base/interfazClientes';
import { InterfazAutentication } from '../services-base/interfazAutenticacion';
import { OPTIONS } from '../utils/options';
import { Http } from '../utils/http';
import { ResponseHttp } from '../utils/responseHttp';

const SERVER =  OPTIONS.SERVER;
const URL_LOGIN_GESTOR = `${SERVER}/login/gestor/`;
const URL_GESTORES = `${SERVER}/gestores/`;
const URL_CLIENTES = `${SERVER}/clientes/`;
const URL_MENSAJES = `${SERVER}/mensajes/`;
const URL_MENSAJES_RECIBIDOS = `${SERVER}/mensajes/recibidos/`;
const URL_MENSAJES_ENVIADOS = `${SERVER}/mensajes/enviados/`;
const URL_TRANSFERENCIAS = `${SERVER}/transferencias/`;

const TOKEN_GESTOR = 'TOKEN_GESTOR';

@Injectable({
  providedIn: 'root'
})
export class HttpGestorService implements
  InterfazAutentication,
  InterfazClientes,
  InterfazGestores,
  InterfazMensajes,
  InterfazTransferencias {

  private token: string;

  login(usuario: string, password: string): Observable<boolean> {

    this.token = (!this.token) ? localStorage.getItem(TOKEN_GESTOR) : this.token;
    if (this.token) {
      return of(true);
    }

    const body = `usuario=${usuario}&password=${password}`;
    const headers: Headers = new Headers();
    headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    return new Observable((observer: Subscriber<boolean>) => {
      (async () => {
        try {

          const data = await Http.post(URL_LOGIN_GESTOR, headers, body);
          const response = JSON.parse(data) as ResponseHttp<{ token: string }>;
          this.token = response.data.token;
          localStorage.setItem(TOKEN_GESTOR, this.token);

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

  agregarGestor(gestor: Gestor): Observable<string> {

    const headers: Headers = new Headers();
    headers.set('Authorization', `Basic ${this.token}`);
    const body = JSON.stringify(gestor);

    return new Observable((observer: Subscriber<string>) => {
      (async () => {
        try {

          const data = await Http.post(URL_GESTORES, headers, body);
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

  obtenerGestores(): Observable<Gestor[]> {
    const headers: Headers = new Headers();
    headers.set('Authorization', `Basic ${this.token}`);

    return new Observable((observer: Subscriber<Gestor[]>) => {
      (async () => {
        try {

          const data = await Http.get(URL_GESTORES, headers);
          const response = JSON.parse(data) as ResponseHttp<Gestor[]>;

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

  obtenerGestorPorId(id: number): Observable<Gestor> {
    const headers: Headers = new Headers();
    headers.set('Authorization', `Basic ${this.token}`);

    return new Observable((observer: Subscriber<Gestor>) => {
      (async () => {
        try {

          const data = await Http.get(`${URL_GESTORES}${id}`, headers);
          const response = JSON.parse(data) as ResponseHttp<Gestor>;

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

  obtenerGestorPorUsuario(usuario: string): Observable<Gestor> {
    const headers: Headers = new Headers();
    headers.set('Authorization', `Basic ${this.token}`);

    return new Observable((observer: Subscriber<Gestor>) => {
      (async () => {
        try {

          const data = await Http.get(`${URL_GESTORES}${usuario}`, headers);
          const response = JSON.parse(data) as ResponseHttp<Gestor>;

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

  eliminarGestorPorUsuario(usuario: string): Observable<string> {
    const headers: Headers = new Headers();
    headers.set('Authorization', `Basic ${this.token}`);

    return new Observable((observer: Subscriber<string>) => {
      (async () => {
        try {

          const data = await Http.delete(`${URL_GESTORES}${usuario}`, headers);
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

  eliminarGestorPorId(id: number): Observable<string> {
    const headers: Headers = new Headers();
    headers.set('Authorization', `Basic ${this.token}`);

    return new Observable((observer: Subscriber<string>) => {
      (async () => {
        try {

          const data = await Http.delete(`${URL_GESTORES}${id}`, headers);
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

  agregarCliente(cliente: Cliente): Observable<string> {
    const headers: Headers = new Headers();
    headers.set('Authorization', `Basic ${this.token}`);
    const body = JSON.stringify(cliente);

    return new Observable((observer: Subscriber<string>) => {
      (async () => {
        try {

          const data = await Http.post(URL_CLIENTES, headers, body);
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
  obtenerClientes(): Observable<Cliente[]> {
    const headers: Headers = new Headers();
    headers.set('Authorization', `Basic ${this.token}`);

    return new Observable((observer: Subscriber<Cliente[]>) => {
      (async () => {
        try {

          const data = await Http.get(URL_CLIENTES, headers);
          const response = JSON.parse(data) as ResponseHttp<Cliente[]>;

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
  obtenerClientePorId(id: number): Observable<Cliente> {
    const headers: Headers = new Headers();
    headers.set('Authorization', `Basic ${this.token}`);

    return new Observable((observer: Subscriber<Cliente>) => {
      (async () => {
        try {

          const data = await Http.get(`${URL_CLIENTES}${id}`, headers);
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

  obtenerClientePorUsuario(usuario: string): Observable<Cliente> {
    const headers: Headers = new Headers();
    headers.set('Authorization', `Basic ${this.token}`);

    return new Observable((observer: Subscriber<Cliente>) => {
      (async () => {
        try {

          const data = await Http.get(`${URL_CLIENTES}${usuario}`, headers);
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

  eliminarClientePorUsuario(usuario: string): Observable<string> {
    const headers: Headers = new Headers();
    headers.set('Authorization', `Basic ${this.token}`);

    return new Observable((observer: Subscriber<string>) => {
      (async () => {
        try {

          const data = await Http.delete(`${URL_CLIENTES}${usuario}`, headers);
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
  eliminarClientePorId(id: number): Observable<string> {
    const headers: Headers = new Headers();
    headers.set('Authorization', `Basic ${this.token}`);

    return new Observable((observer: Subscriber<string>) => {
      (async () => {
        try {

          const data = await Http.delete(`${URL_CLIENTES}${id}`, headers);
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

  obtenerMensajes(): Observable<Mensaje[]> {
    const headers: Headers = new Headers();
    headers.set('Authorization', `Basic ${this.token}`);

    return new Observable((observer: Subscriber<Mensaje[]>) => {
      (async () => {
        try {

          const data = await Http.get(URL_MENSAJES, headers);
          const response = JSON.parse(data) as ResponseHttp<Mensaje[]>;

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

  obtenerMensajesRecibidosPorUsuario(usuario: string): Observable<Mensaje[]> {
    const headers: Headers = new Headers();
    headers.set('Authorization', `Basic ${this.token}`);

    return new Observable((observer: Subscriber<Mensaje[]>) => {
      (async () => {
        try {

          const data = await Http.get(`${URL_MENSAJES_RECIBIDOS}${usuario}`, headers);
          const response = JSON.parse(data) as ResponseHttp<Mensaje[]>;

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

  obtenerMensajesEnviadosPorUsuario(usuario: string): Observable<Mensaje[]> {
    const headers: Headers = new Headers();
    headers.set('Authorization', `Basic ${this.token}`);

    return new Observable((observer: Subscriber<Mensaje[]>) => {
      (async () => {
        try {

          const data = await Http.get(`${URL_MENSAJES_ENVIADOS}${usuario}`, headers);
          const response = JSON.parse(data) as ResponseHttp<Mensaje[]>;

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

  obtenerMensajePorId(id: number): Observable<Mensaje> {
    const headers: Headers = new Headers();
    headers.set('Authorization', `Basic ${this.token}`);

    return new Observable((observer: Subscriber<Mensaje>) => {
      (async () => {
        try {

          const data = await Http.get(`${URL_MENSAJES}${id}`, headers);
          const response = JSON.parse(data) as ResponseHttp<Mensaje>;

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

  enviarMensaje(mensaje: Mensaje): Observable<string> {
    const headers: Headers = new Headers();
    headers.set('Authorization', `Basic ${this.token}`);
    const body = JSON.stringify(mensaje);

    return new Observable((observer: Subscriber<string>) => {
      (async () => {
        try {

          const data = await Http.post(URL_MENSAJES, headers, body);
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

  eliminarMensajes(): Observable<string> {
    const headers: Headers = new Headers();
    headers.set('Authorization', `Basic ${this.token}`);

    return new Observable((observer: Subscriber<string>) => {
      (async () => {
        try {

          const data = await Http.delete(`${URL_MENSAJES}`, headers);
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

  eliminarMensajePorId(id: number): Observable<string> {
    const headers: Headers = new Headers();
    headers.set('Authorization', `Basic ${this.token}`);

    return new Observable((observer: Subscriber<string>) => {
      (async () => {
        try {

          const data = await Http.delete(`${URL_MENSAJES}${id}`, headers);
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

          const data = await Http.get(URL_TRANSFERENCIAS, headers);
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

          const data = await Http.get(`${URL_TRANSFERENCIAS}${id}`, headers);
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
}
