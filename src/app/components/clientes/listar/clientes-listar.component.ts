import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../models/cliente';
import { AlertService } from '../../../services/alert.service';
import { HttpGestorService } from '../../../services/http-gestor.service';
import { AutenticacionService } from '../../../services/autenticacion.service';

@Component({
  selector: 'app-clientes-listar',
  templateUrl: './clientes-listar.component.html',
  styleUrls: ['./clientes-listar.component.css']
})
export class ClientesListarComponent implements OnInit {

  clientes: Cliente[];
  nuevo: number;

  constructor(private httpGestorService: HttpGestorService) { }

  ngOnInit() {

    (async () => {

      const clientes = await this.httpGestorService.obtenerClientes().toPromise();

      for (const cliente1 of clientes) {

        if (!cliente1.usuario_gestor) {
          const gestor = await this.httpGestorService.obtenerGestorPorId(cliente1.id_gestor).toPromise();

          for (const cliente2 of clientes) {
            cliente2.usuario_gestor = (cliente2.id_gestor === cliente1.id_gestor) ?
              gestor.usuario : cliente2.usuario_gestor;
          }
        }
      }

      this.clientes = clientes;
    })();
  }

  agregarCliente(cliente: Cliente): void {
    this.clientes.push(cliente);
    this.nuevo = cliente.id;
    setTimeout(() => {
      this.nuevo = null;
    }, 2000);
  }

  onEliminarCliente(clienteParaEliminar: Cliente) {

    this.httpGestorService.eliminarClientePorId(clienteParaEliminar.id).subscribe(() => {
      this.clientes = this.clientes.filter(cliente => cliente.id !== clienteParaEliminar.id);
    });
  }
}
