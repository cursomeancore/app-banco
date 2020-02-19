import { Component, OnInit, OnDestroy } from '@angular/core';
import { Mensaje } from '../../../models/mensaje';
import { HttpGestorService } from '../../../services/http-gestor.service';
import { AutenticacionService } from '../../../services/autenticacion.service';

@Component({
  selector: 'app-mensajes-recibidos',
  templateUrl: './mensajes-recibidos.component.html',
  styleUrls: ['./mensajes-recibidos.component.css']
})
export class MensajesRecibidosComponent implements OnInit, OnDestroy {

  mensajesRecibidos: Mensaje[];
  eliminado: number;
  actualizado = false;
  actualizarAutomaticamente = false;
  actualizarAutomaticamenteInterval: any;

  constructor(private httpGestorService: HttpGestorService,
              private autenticacionService: AutenticacionService) { }

  ngOnInit(): void {
    this.obtenerMensajes();
  }

  actualizarMensajes() {
    this.actualizado = true;
    this.obtenerMensajes();
  }

  obtenerMensajes() {

    (async() => {

      const mensajes: Mensaje[] = await this.httpGestorService
        .obtenerMensajesRecibidosPorUsuario(this.autenticacionService.tokenGestor).toPromise();

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
      this.mensajesRecibidos = mensajes;
      this.actualizado = false;
    })();
  }

  onEliminarMensaje(mensajeParaEliminar: Mensaje) {
    this.eliminado = mensajeParaEliminar.id;
    this.httpGestorService.eliminarMensajePorId(mensajeParaEliminar.id).subscribe(() => {
      this.mensajesRecibidos = this.mensajesRecibidos.filter(mensaje => mensaje.id !== mensajeParaEliminar.id);
      this.eliminado = null;
    });
  }

  onActualizar() {
    this.actualizarAutomaticamente = !this.actualizarAutomaticamente;

    if (this.actualizarAutomaticamente) {
      this.actualizarAutomaticamenteInterval = setInterval(() => this.obtenerMensajes(), 1000);
    } else if (this.actualizarAutomaticamenteInterval) {
      clearInterval(this.actualizarAutomaticamenteInterval);
    }
  }

  ngOnDestroy(): void {
    if (this.actualizarAutomaticamenteInterval) {
      clearInterval(this.actualizarAutomaticamenteInterval);
    }
  }
}
