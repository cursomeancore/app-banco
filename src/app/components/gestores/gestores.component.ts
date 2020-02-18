import { Component, OnInit, ViewChild } from '@angular/core';
import { Gestor } from './../../models/gestor';
import { GestoresListarComponent } from './listar/gestores-listar.component';

@Component({
  selector: 'app-gestores',
  templateUrl: './gestores.component.html',
  styleUrls: ['./gestores.component.css']
})
export class GestoresComponent implements OnInit {

  @ViewChild(GestoresListarComponent) private gestoresListarComponent: GestoresListarComponent;
  constructor() { }

  ngOnInit() { }

  onNuevoGestor(gestor: Gestor) {
    this.gestoresListarComponent.agregarGestor(gestor);
  }
}
