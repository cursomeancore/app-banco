import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { HttpGestorService } from '../../../services/http-gestor.service';
import { Gestor } from './../../../models/gestor';
import { AutenticacionService } from '../../../services/autenticacion.service';
import { Mensaje } from '../../../models/mensaje';
import { AlertService } from '../../../services/alert.service';
import { TIPO_ALERTA } from '../../../data/alerta';

@Component({
  selector: 'app-mensajes-enviar',
  templateUrl: './mensajes-enviar.component.html',
  styleUrls: ['./mensajes-enviar.component.css']
})
export class MensajesEnviarComponent implements OnInit {

  @ViewChild('gestorDestinatarioInput', { static: false }) gestorAsociadoInputRef: ElementRef;
  @ViewChild('textoInput', { static: false }) textoInputRef: ElementRef;
  @Output() nuevoMensaje = new EventEmitter<Mensaje>();

  gestores: Gestor[];
  enviado = false;

  constructor(private httpGestorService: HttpGestorService,
              private autenticacionService: AutenticacionService,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.httpGestorService.obtenerGestores()
      .subscribe(gestores => this.gestores = gestores
        .filter(gestor => (gestor.usuario !== this.autenticacionService.usuarioGestor)));
  }

  onEnviarMensaje() {
  
    (async () => {

      this.enviado = true;

      const idGestorDestinario = this.gestorAsociadoInputRef.nativeElement.value;

      const gestorDestinatario = await this.httpGestorService
        .obtenerGestorPorId(idGestorDestinario).toPromise();

      const mensaje: Mensaje = {
        id_destino: gestorDestinatario.id,
        texto: this.textoInputRef.nativeElement.value,
      };

      try {
        await this.httpGestorService.enviarMensaje(mensaje).toPromise();

        this.alertService.enviarAlerta({
          texto: 'Mensaje enviado correctamente',
          tipo: TIPO_ALERTA.SUCCESS,
          tiempo: 2000
        });

      } catch (err) {
        this.alertService.enviarAlerta({
          texto: err,
          tipo: TIPO_ALERTA.DANGER,
          tiempo: 2000
        });
      }

      this.textoInputRef.nativeElement.value = '';
      this.enviado = false;

    })();
  }
}
