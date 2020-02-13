export interface Transferencia {
  id?: number;
  id_ordenante: number;
  id_beneficiario: number;
  importe: number;
  concepto: string;
  fecha: Date;
}
