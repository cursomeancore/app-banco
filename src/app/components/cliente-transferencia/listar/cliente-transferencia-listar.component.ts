import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpGestorService } from '../../../services/http-gestor.service';
import { Transferencia } from '../../../models/transferencia';
import { HttpClienteService } from '../../../services/http-cliente.service';

@Component({
  selector: 'app-cliente-transferencia-listar',
  templateUrl: './cliente-transferencia-listar.component.html',
  styleUrls: ['./cliente-transferencia-listar.component.css']
})
export class ClienteTransferenciaListarComponent implements OnInit, OnDestroy {

  transferencias: Transferencia[];
  actualizando = false;
  private actualizarAutomaticamente = false;
  private actualizarAutomaticamenteInterval: any;

  constructor(private httpClienteService: HttpClienteService) { }

  ngOnInit(): void {
    this.obtenerTransferencias();
  }

  obtenerTransferencias() {

    this.actualizando = true;
    this.httpClienteService.obtenerTransferencias()
      .subscribe(transferencias => { 
        this.transferencias = transferencias;
        this.actualizando = false;
      });
  }

  onActualizarTransferencias() {
    this.transferencias = [];
    this.obtenerTransferencias();
  }

  onActualizar() {
    this.actualizarAutomaticamente = !this.actualizarAutomaticamente;

    if (this.actualizarAutomaticamente) {
      this.actualizarAutomaticamenteInterval = setInterval(() => this.obtenerTransferencias(), 1000);
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
