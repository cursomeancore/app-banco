import { Observable, Subscriber } from 'rxjs';
import { ResponseHttp } from './responseHttp';
import { MSG } from './constantes';

export enum METODOS_HTTP { GET = 'GET', POST = 'POST', DELETE = 'DELETE' };

export class ExecuteHttp {

  protected token: string;

  protected login(usuario: string, password: string, url: string): Observable<boolean> {

    return new Observable<boolean>(observer => {

      (async () => {
        const body = `usuario=${usuario}&password=${password}`;
        const headers: Headers = new Headers();
        headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

        try {
          const response: { token: string } = await this
            .execute<{ token: string }>(url, METODOS_HTTP.POST, headers, body).toPromise();

          this.token = response.token;
          observer.complete();

        } catch (err) {
          observer.error(err);
        }
      })();
    });
  }

  protected execute<T>(url: string, method: METODOS_HTTP, headers?: Headers, body: string = ''): Observable<T> {

    if (!headers) {
      headers = new Headers();
      headers.set('Authorization', `Basic ${this.token}`);
    }

    return new Observable((observer: Subscriber<T>) => {
      (async () => {
        try {

          const data = await this.send(`${url}`, method, headers, body);
          const response = JSON.parse(data) as ResponseHttp<T>;

          if (!response.ok) {
            observer.error(response.msg);
          }

          observer.next(response.data);
          observer.complete();

        } catch (err) {
          observer.error(MSG.ERROR_INTERNO_SERVIDOR);
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
}
