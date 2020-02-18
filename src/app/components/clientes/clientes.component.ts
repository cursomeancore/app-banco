import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { ClientesListarComponent } from '../clientes/listar/clientes-listar.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  @ViewChild(ClientesListarComponent) private clientesListarComponent: ClientesListarComponent;
  constructor() { }

  ngOnInit() { }

  onNuevoCliente(cliente: Cliente) {
    this.clientesListarComponent.agregarCliente(cliente);
  }

}
