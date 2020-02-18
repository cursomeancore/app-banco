import { Usuario } from '../models-base/Usuario';

export interface Cliente extends Usuario {
  id_gestor: number;
  usuario_gestor?: string;
  saldo: number;
}
