import { Component, OnInit } from '@angular/core';
import { HttpClienteService } from '../../services/http-cliente.service';
import { Cliente } from '../../models/cliente';
import { switchMap } from 'rxjs/operators/';

@Component({
  selector: 'app-cliente-info',
  templateUrl: './cliente-info.component.html',
  styleUrls: ['./cliente-info.component.css']
})
export class ClienteInfoComponent implements OnInit {

  cliente: Cliente;

  constructor(private httpClienteService: HttpClienteService) { }

  ngOnInit(): void {
    this.httpClienteService.obtenerInfo().subscribe(cliente => this.cliente = cliente);
  }

}
