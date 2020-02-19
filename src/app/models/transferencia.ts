export interface Transferencia {
  id?: number;
  id_ordenante: number;
  usuario_ordenante?: string;
  id_beneficiario: number;
  usuario_beneficiario?: string;
  importe: number;
  concepto: string;
  fecha: Date;
}
