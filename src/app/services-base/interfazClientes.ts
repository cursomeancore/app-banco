import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

export interface InterfazClientes {

  agregarCliente(cliente: Cliente): Observable<string>;

  obtenerClientes(): Observable<Cliente[]>;

  obtenerClientePorId(id: number): Observable<Cliente>;

  obtenerClientePorUsuario(usuario: string): Observable<Cliente>;

  eliminarClientePorUsuario(usuario: string): Observable<string>;

  eliminarClientePorId(id: number): Observable<string>;
}
