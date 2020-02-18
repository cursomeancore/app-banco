import { Component, OnInit } from '@angular/core';
import { HttpGestorService } from '../../../services/http-gestor.service';
import { AutenticacionService } from '../../../services/autenticacion.service';
import { Mensaje } from '../../../models/mensaje';

@Component({
  selector: 'app-mensajes-enviados',
  templateUrl: './mensajes-enviados.component.html',
  styleUrls: ['./mensajes-enviados.component.css']
})
export class MensajesEnviadosComponent implements OnInit {

  mensajesEnviados: Mensaje[];
  eliminado: number;
  actualizado = false;

  constructor(private httpGestorService: HttpGestorService, private autenticacionService: AutenticacionService) { }

  ngOnInit(): void {
    this.obtenerMensajes();
  }

  actualizarMensajes() {
    this.actualizado = true;
    this.obtenerMensajes();
  }

  async obtenerMensajes() {

    const mensajes: Mensaje[] = await this.httpGestorService
      .obtenerMensajesEnviadosPorUsuario(this.autenticacionService.tokenGestor).toPromise();

    for (const mensaje1 of mensajes) {

      if ((!mensaje1.usuario_origen) || (mensaje1.usuario_destino)) {
        const gestorOrigen = await this.httpGestorService.obtenerGestorPorId(mensaje1.id_origen).toPromise();
        const gestorDestino = await this.httpGestorService.obtenerGestorPorId(mensaje1.id_destino).toPromise();

        for (const mensaje2 of mensajes) {

          mensaje2.usuario_origen = (mensaje2.id_origen === gestorOrigen.id) ?
            gestorOrigen.usuario : mensaje2.usuario_origen;

          mensaje2.usuario_destino = (mensaje2.id_destino === gestorDestino.id) ?
            gestorDestino.usuario : mensaje2.usuario_destino;
        }
      }
    }
    this.mensajesEnviados = mensajes;
    this.actualizado = false;
  }


  onEliminarMensaje(mensajeParaEliminar: Mensaje) {
    this.eliminado = mensajeParaEliminar.id;
    this.httpGestorService.eliminarMensajePorId(mensajeParaEliminar.id).subscribe(() => {
      this.mensajesEnviados = this.mensajesEnviados.filter(mensaje => mensaje.id !== mensajeParaEliminar.id);
      this.eliminado = null;
    });
  }
}
