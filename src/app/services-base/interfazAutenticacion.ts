import { Observable } from 'rxjs';

export interface InterfazAutentication {
  login(usuario: string, password: string): Observable<boolean>;
  isAuthenticated(): boolean;
}