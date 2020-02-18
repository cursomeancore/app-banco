import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { TIPO_ALERTA } from '../../data/alerta';
import { HttpGestorService } from '../../services/http-gestor.service';
import { Gestor } from './../../models/gestor';
import { GestoresListarComponent } from './listar/gestores-listar.component';

@Component({
  selector: 'app-gestores',
  templateUrl: './gestores.component.html',
  styleUrls: ['./gestores.component.css']
})
export class GestoresComponent implements OnInit {

  @ViewChild(GestoresListarComponent) private gestoresListarComponent: GestoresListarComponent;
  constructor(private alertService: AlertService, private httpGestorService: HttpGestorService) { }

  ngOnInit() { }

  onNuevoGestor(gestor: Gestor) {
    this.gestoresListarComponent.agregarGestor(gestor);
  }
}
