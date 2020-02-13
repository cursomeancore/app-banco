
export enum TIPO_ALERTA {
  SUCCESS = 'alert-success',
  DANGER = 'alert-danger',
  WARNING = 'alert-warning'
};

export interface Alerta {
  texto: string;
  tipo: TIPO_ALERTA;
  tiempo?: number;
}