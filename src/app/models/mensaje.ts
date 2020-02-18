export interface Mensaje {
  id?: number;
  id_origen?: number;
  usuario_origen?: string;
  id_destino: number;
  usuario_destino?: string;
  texto: string;
  fecha?: Date;
}
