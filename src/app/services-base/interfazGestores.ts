import { Observable } from 'rxjs';
import { Gestor } from '../models/gestor';

export interface InterfazGestores {

  agregarGestor(gestor: Gestor): Observable<string>;

  obtenerGestores(): Observable<Gestor[]>;

  obtenerGestorPorId(id: number): Observable<Gestor>;

  obtenerGestorPorUsuario(usuario: string): Observable<Gestor>;

  eliminarGestorPorUsuario(usuario: string): Observable<string>;

  eliminarGestorPorId(id: number): Observable<string>;
}
