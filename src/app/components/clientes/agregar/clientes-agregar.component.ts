import { Component, ViewChild, ElementRef, Output, EventEmitter, OnInit } from '@angular/core';
import { Cliente } from '../../../models/cliente';
import { AlertService } from '../../../services/alert.service';
import { HttpGestorService } from '../../../services/http-gestor.service';
import { TIPO_ALERTA } from '../../../data/alerta';
import { Gestor } from './../../../models/gestor';

@Component({
  selector: 'app-clientes-agregar',
  templateUrl: './clientes-agregar.component.html',
  styleUrls: ['./clientes-agregar.component.css']
})
export class ClientesAgregarComponent implements OnInit {

  @ViewChild('gestorAsociadoInput', { static: false }) gestorAsociadoInputRef: ElementRef;
  @ViewChild('usuarioInput', { static: false }) usuarioInputRef: ElementRef;
  @ViewChild('passwordInput', { static: false }) passwordInputRef: ElementRef;
  @ViewChild('correoInput', { static: false }) correoInputRef: ElementRef;
  @ViewChild('saldoInput', { static: false }) saldoInputRef: ElementRef;
  @Output() nuevoCliente = new EventEmitter<Cliente>();

  gestores: Gestor[];
  agregado = false;

  constructor(private httpGestorService: HttpGestorService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.httpGestorService.obtenerGestores().subscribe(gestores => this.gestores = gestores);
  }

  onAgregarCliente() {

    this.agregado = true;

    const cliente: Cliente = {
      id_gestor: +this.gestorAsociadoInputRef.nativeElement.value,
      usuario: this.usuarioInputRef.nativeElement.value,
      password: this.passwordInputRef.nativeElement.value,
      correo: this.correoInputRef.nativeElement.value,
      saldo: +this.saldoInputRef.nativeElement.value
    };

    this.httpGestorService.agregarCliente(cliente).subscribe(() => {
      this.alertService.enviarAlerta({
        texto: 'Cliente agregado correctamente',
        tipo: TIPO_ALERTA.SUCCESS,
        tiempo: 2000
      });

      // es necesario obtener el nuevo cliente para conocer el id
      this.httpGestorService.obtenerClientePorUsuario(cliente.usuario).subscribe(nuevoCliente => {

        // es necesario obtener el gestor para conocer el usuario
        this.httpGestorService.obtenerGestorPorId(nuevoCliente.id_gestor).subscribe(gestor => {

          nuevoCliente.usuario_gestor = gestor.usuario;

          // emitir el nuevo cliente
          this.nuevoCliente.emit(nuevoCliente);

          // resetear todos los campos
          this.usuarioInputRef.nativeElement.value = '';
          this.passwordInputRef.nativeElement.value = '';
          this.correoInputRef.nativeElement.value = '';
          this.saldoInputRef.nativeElement.value = '';

          this.agregado = false;
        });
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
