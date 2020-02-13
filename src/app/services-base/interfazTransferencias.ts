import { Observable } from 'rxjs';
import { Mensaje } from '../models/mensaje';
import { Transferencia } from '../models/transferencia';

export interface InterfazTransferencias {

  obtenerTransferencias(): Observable<Transferencia[]>;

  obtenerTransferenciaPorId(id: number): Observable<Transferencia>;
}
