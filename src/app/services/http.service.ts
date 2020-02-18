import { Injectable } from '@angular/core';
import { AutenticacionService, TOKEN_TAG } from './autenticacion.service';
import { Observable, Subscriber } from 'rxjs';
import { ResponseHttp } from '../utils/responseHttp';
import { MSG } from '../utils/constantes';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

export enum METODOS_HTTP {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE'
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(protected autenticacionService: AutenticacionService) { }

  public loginGestor(usuario: string, password: string, url: string) {
    return this.login(TOKEN_TAG.GESTOR, usuario, password, url);
  }

  public loginCliente(usuario: string, password: string, url: string) {
    return this.login(TOKEN_TAG.CLIENTE, usuario, password, url);
  }

  private login(tag: string, usuario: string, password: string, url: string): Observable<boolean> {

    return new Observable<boolean>(observer => {

      (async () => {
        const body = `usuario=${usuario}&password=${password}`;
        const headers: Headers = new Headers();
        headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

        try {
          const response: { token: string } = await this
            .execute<{ token: string }>(tag, null, url, METODOS_HTTP.POST, headers, body).toPromise();

          this.autenticado(tag, response.token);
          observer.complete();

        } catch (err) {
          this.noAutenticado(tag);
          observer.error(err);
        }
      })();
    });
  }

  public executeGestor<T>(url: string, method: METODOS_HTTP, headers?: Headers, body?: string): Observable<T> {
    return this.execute(TOKEN_TAG.GESTOR, this.autenticacionService.tokenGestor, url, method, headers, body);
  }

  public executeCliente<T>(url: string, method: METODOS_HTTP, headers?: Headers, body?: string): Observable<T> {
    return this.execute(TOKEN_TAG.CLIENTE, this.autenticacionService.tokenCliente, url, method, headers, body);
  }

  private execute<T>( tag: string,
                      token: string,
                      url: string,
                      method: METODOS_HTTP,
                      headers?: Headers,
                      body?: string): Observable<T> {

    if (token) {
      headers = new Headers();
      headers.set('Authorization', `Basic ${token}`);
    }

    return new Observable((observer: Subscriber<T>) => {
      (async () => {
        try {

          const data = await this.send(`${url}`, method, headers, body);
          const response = JSON.parse(data) as ResponseHttp<T>;
          console.log(response);
          if (!response.ok) {

            if (response.msg === MSG.PRIVILEGIOS_INSUFICIENTES) {
              this.autenticacionService.logout();
            }
            observer.error(response.msg);
          }

          observer.next(response.data);
          observer.complete();

        } catch (err) {
          observer.error(MSG.ERROR_INTERNO_SERVIDOR);
          this.autenticacionService.logout();
        }
      })();
    });
  }

  private send(url: RequestInfo, method: METODOS_HTTP, headers: Headers = new Headers(), body: string): Promise<string> {

    const options: RequestInit = {
      method: method.toString(),
      headers
    };

    if (method !== METODOS_HTTP.GET) {
      options.body = body;
    }

    return fetch(url, options).then(response => response.text());
  }

  private autenticado(tag: string, token: string) {
    (tag === TOKEN_TAG.CLIENTE) ? this.autenticacionService.clienteAutenticado(token) :
      this.autenticacionService.gestorAutenticado(token);
  }

  private noAutenticado(tag: string) {
    (tag === TOKEN_TAG.CLIENTE) ? this.autenticacionService.clienteNoAutenticado() :
      this.autenticacionService.gestorNoAutenticado();
  }

}
