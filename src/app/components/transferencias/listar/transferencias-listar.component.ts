import { Component, OnInit } from '@angular/core';
import { Transferencia } from '../../../models/transferencia';
import { HttpGestorService } from '../../../services/http-gestor.service';

@Component({
  selector: 'app-transferencias-listar',
  templateUrl: './transferencias-listar.component.html',
  styleUrls: ['./transferencias-listar.component.css']
})
export class TransferenciasListarComponent implements OnInit {

  transferencias: Transferencia[];
  actualizado = false;
  private actualizarAutomaticamente = false;
  private actualizarAutomaticamenteInterval: any;

  constructor(private httpGestorService: HttpGestorService) { }

  ngOnInit(): void {
    this.obtenerTransferencias();
  }

  obtenerTransferencias() {

    (async () => {

      this.actualizado = true;

      const transferencias: Transferencia[] = await this.httpGestorService
        .obtenerTransferencias().toPromise();

      for (const transferencia1 of transferencias) {

        if ((!transferencia1.id_ordenante) || (transferencia1.id_beneficiario)) {

          const clienteOrdenante = await this.httpGestorService.obtenerClientePorId(transferencia1.id_ordenante).toPromise();
          const clienteBeneficiario = await this.httpGestorService.obtenerClientePorId(transferencia1.id_beneficiario).toPromise();

          for (const transferencia2 of transferencias) {

            transferencia2.usuario_ordenante =
              (transferencia2.id_ordenante === clienteOrdenante.id) ?
              clienteOrdenante.usuario : transferencia2.usuario_ordenante;

            transferencia2.usuario_beneficiario =
              (transferencia2.id_beneficiario === clienteBeneficiario.id) ?
              clienteBeneficiario.usuario : transferencia2.usuario_beneficiario;

          }
        }
      }

      this.transferencias = transferencias;
      this.actualizado = false;
    })();
  }

  onActualizarTransferencias() {
    this.transferencias = [];
    this.obtenerTransferencias();
  }

  onActualizar() {
    this.actualizarAutomaticamente = !this.actualizarAutomaticamente;

    if (this.actualizarAutomaticamente) {
      this.actualizarAutomaticamenteInterval = setInterval(() => this.obtenerTransferencias, 1000);
    } else if (this.actualizarAutomaticamenteInterval) {
      clearInterval(this.actualizarAutomaticamenteInterval);
    }
  }

}
