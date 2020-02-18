import { HttpGestorService } from '../../../services/http-gestor.service';
import { catchError } from 'rxjs/operators';
import { AlertService } from '../../../services/alert.service';

import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { TIPO_ALERTA } from '../../../data/alerta';


@Component({
  selector: 'app-gestores-agregar',
  templateUrl: './gestores-agregar.component.html',
  styleUrls: ['./gestores-agregar.component.css']
})
export class GestoresAgregarComponent {
  @ViewChild('usuarioInput', { static: false }) nameInputRef: ElementRef;
  @ViewChild('passwordInput', { static: false }) amountInputRef: ElementRef;

  constructor(private httpGestorService: HttpGestorService, private alertService: AlertService) { }

  onAgregarGestor(usuarioInput: HTMLInputElement,
                  passwordInput: HTMLInputElement,
                  correoInput: HTMLInputElement) {

    const usuario = {
      usuario: usuarioInput.value,
      password: passwordInput.value,
      correo: correoInput.value,
    }

    this.httpGestorService.agregarGestor(usuario)
    .subscribe(() => {
      this.alertService.enviarAlerta({
        texto: 'Gestor agregado correctamente',
        tipo: TIPO_ALERTA.SUCCESS,
        tiempo: 4000
      });

      // resetear todos los campos
      usuarioInput.value = '';
      passwordInput.value = '';
      correoInput.value = '';

    }, (err) => {
      this.alertService.enviarAlerta({
        texto: err,
        tipo: TIPO_ALERTA.DANGER,
        tiempo: 4000
      });
    });
  }
}
