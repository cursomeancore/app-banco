import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TIPO_ALERTA } from '../../../data/alerta';
import { Transferencia } from '../../../models/transferencia';
import { HttpClienteService } from '../../../services/http-cliente.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-cliente-transferencia-ingresar',
  templateUrl: './cliente-transferencia-ingresar.component.html',
  styleUrls: ['./cliente-transferencia-ingresar.component.css']
})
export class ClienteTransferenciaIngresarComponent implements OnInit {

  @ViewChild('idBeneficiarioInput', { static: false }) idBeneficiarioInputRef: ElementRef;
  @ViewChild('importeInput', { static: false }) importeInputRef: ElementRef;
  @ViewChild('conceptoInput', { static: false }) conceptoInputRef: ElementRef;
  saldo: number;
  realizandoTransferencia = false;
  ingresando = false;

  constructor(private httpClienteService: HttpClienteService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.ingresando = true;
    this.obtenerSaldo();
  }

  obtenerSaldo() {
    this.httpClienteService.obtenerInfo().subscribe(cliente => {
      this.saldo = cliente.saldo;
      this.ingresando = false;
    });
  }

  onRealizarTransferencia() {

    const transferencia: Transferencia = {
      id_beneficiario: +this.idBeneficiarioInputRef.nativeElement.value,
      concepto: this.conceptoInputRef.nativeElement.value,
      importe: +this.importeInputRef.nativeElement.value
    } as Transferencia;

    this.realizandoTransferencia = true;

    this.httpClienteService.realizarTransferencia(transferencia).subscribe(() => {

      this.importeInputRef.nativeElement.value = 100;
      this.conceptoInputRef.nativeElement.value = '';

      this.alertService.enviarAlerta({
        texto: 'Transferencia realizada con éxito',
        tipo: TIPO_ALERTA.SUCCESS,
        tiempo: 2000
      });

      this.realizandoTransferencia = false;
      this.obtenerSaldo();

    }, (err) => {

      this.alertService.enviarAlerta({
        texto: err,
        tipo: TIPO_ALERTA.DANGER,
        tiempo: 2000
      });

      this.realizandoTransferencia = false;
    });
  }

}

