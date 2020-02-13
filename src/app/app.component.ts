import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { HttpClienteService } from './services/http-cliente.service';
import { HttpGestorService } from './services/http-gestor.service';
import { AutenticacionService } from './services/autenticacion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {}
}
