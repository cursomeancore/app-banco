import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../services/autenticacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.components.css']
})
export class HeaderComponent implements OnInit {

  clienteAutenticado = false;
  gestorAutenticado = false;

  constructor(private autenticacionService: AutenticacionService, private router: Router) {
    this.clienteAutenticado = this.autenticacionService.estaClienteAutenticado();
    this.gestorAutenticado = this.autenticacionService.estaGestorAutenticado();
  }

  ngOnInit() {

    this.autenticacionService.getAlertasGestor().subscribe(autenticado => {
      this.gestorAutenticado = autenticado;
    });

    this.autenticacionService.getAlertasCliente().subscribe(autenticado => {
      this.clienteAutenticado = autenticado;
    });
  }

  onLogout() {
    this.autenticacionService.logout();
  }
}
