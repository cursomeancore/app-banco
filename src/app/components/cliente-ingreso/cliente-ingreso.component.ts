import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClienteService } from '../../services/http-cliente.service';
import { AlertService } from '../../services/alert.service';
import { TIPO_ALERTA } from '../../data/alerta';

@Component({
  selector: 'app-cliente-ingreso',
  templateUrl: './cliente-ingreso.component.html',
  styleUrls: ['./cliente-ingreso.component.css']
})
export class ClienteIngresoComponent implements OnInit {

  @ViewChild('cantidadInput', { static: false }) cantidadInputRef: ElementRef;
  saldo: number;
  ingresando = false;

  constructor(private httpClienteService: HttpClienteService,
              private alertService: AlertService) { }

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

  realizarIngreso() {
    this.ingresando = true;
    const cantidad: number = +this.cantidadInputRef.nativeElement.value;

    if (cantidad <= 0) {
      this.ingresando = false;
      return this.alertService.enviarAlerta({
        texto: 'La cantidad debe ser mayor que 0',
        tipo: TIPO_ALERTA.DANGER,
        tiempo: 2000
      })
    }


    this.httpClienteService.realizarIngreso(cantidad).subscribe(() => this.obtenerSaldo());
  }

}
