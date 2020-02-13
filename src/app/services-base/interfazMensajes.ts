import { Observable } from 'rxjs';
import { Mensaje } from '../models/mensaje';

export interface InterfazMensajes {

  obtenerMensajes(): Observable<Mensaje[]>;

  obtenerMensajesRecibidosPorUsuario(usuario: string): Observable<Mensaje[]>;

  obtenerMensajesEnviadosPorUsuario(usuario: string): Observable<Mensaje[]>;

  obtenerMensajePorId(id: number): Observable<Mensaje>;

  enviarMensaje(mensaje: Mensaje): Observable<string>;

  eliminarMensajes(): Observable<string>;

  eliminarMensajePorId(id: number): Observable<string>;
}
