import { Usuario } from '../models-base/Usuario';

export interface Cliente extends Usuario {
  id_gestor: number;
  saldo: number;
}
