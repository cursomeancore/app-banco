import { HttpGestorService } from '../../../services/http-gestor.service';
import { catchError } from 'rxjs/operators';
import { AlertService } from '../../../services/alert.service';

import {
  Component,
  ElementRef,
  ViewChild,
  Output
} from '@angular/core';
import { TIPO_ALERTA } from '../../../data/alerta';
import { EventEmitter } from '@angular/core';
import { Gestor } from './../../../models/gestor';


@Component({
  selector: 'app-gestores-agregar',
  templateUrl: './gestores-agregar.component.html',
  styleUrls: ['./gestores-agregar.component.css']
})
export class GestoresAgregarComponent {
  @ViewChild('usuarioInput', { static: false }) usuarioInputRef: ElementRef;
  @ViewChild('passwordInput', { static: false }) passwordInputRef: ElementRef;
  @ViewChild('correoInput', { static: false }) correoInputRef: ElementRef;
  @Output() nuevoGestor = new EventEmitter<Gestor>();

  constructor(private httpGestorService: HttpGestorService, private alertService: AlertService) { }

  onAgregarGestor() {

    const gestor: Gestor = {
      usuario: this.usuarioInputRef.nativeElement.value,
      password: this.passwordInputRef.nativeElement.value,
      correo: this.correoInputRef.nativeElement.value,
    };

    this.httpGestorService.agregarGestor(gestor).subscribe(() => {
      this.alertService.enviarAlerta({
        texto: 'Gestor agregado correctamente',
        tipo: TIPO_ALERTA.SUCCESS,
        tiempo: 2000
      });

      // es necesario obtener el nuevo gestor para conocer el id
      this.httpGestorService.obtenerGestorPorUsuario(gestor.usuario).subscribe(nuevoGestor => {

        // emitir el nuevo gestor
        this.nuevoGestor.emit(nuevoGestor);

        // resetear todos los campos
        this.usuarioInputRef.nativeElement.value = '';
        this.passwordInputRef.nativeElement.value = '';
        this.correoInputRef.nativeElement.value = '';

      });

    }, (err) => {
      this.alertService.enviarAlerta({
        texto: err,
        tipo: TIPO_ALERTA.DANGER,
        tiempo: 2000
      });
    });
  }
}
