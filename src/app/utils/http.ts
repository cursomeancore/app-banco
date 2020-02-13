export class Http {

  static get(url: RequestInfo, headers: Headers = new Headers()): Promise<string> {

    return fetch(url, {
      method: 'GET',
      headers,
    } as RequestInit)
    .then(response => {
      return response.text();
    });
  }

  static post(url: RequestInfo, headers: Headers = new Headers(), body: string = ''): Promise<string> {

    return fetch(url, {
      method: 'POST',
      headers,
      body
    } as RequestInit)
    .then(response => {
      return response.text();
    });
  }

  static delete(url: RequestInfo, headers: Headers = new Headers(), body: string = ''): Promise<string> {

    return fetch(url, {
      method: 'DELETE',
      headers,
      body
    } as RequestInit)
    .then(response => {
      return response.text();
    });
  }
}
