import { Observable } from 'rxjs';
import { Transferencia } from '../models/transferencia';
import { Cliente } from '../models/cliente';

export interface InterfazCliente {

  obtenerInfo(): Observable<Cliente>;

  realizarIngreso(cantidad: number): Observable<string>;

  realizarTransferencia(transferencia: Transferencia): Observable<string>;

  obtenerTransferencias(): Observable<Transferencia[]>;

  obtenerTransferenciaPorId(id: number): Observable<Transferencia>;
}
