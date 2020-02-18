import { Component, OnInit } from '@angular/core';
import { HttpGestorService } from '../../../services/http-gestor.service';
import { Gestor } from './../../../models/gestor';


@Component({
  selector: 'app-gestores-listar',
  templateUrl: './gestores-listar.component.html',
  styleUrls: ['./gestores-listar.component.css']
})
export class GestoresListarComponent implements OnInit {

  gestores: Gestor[];
  nuevo: number;

  constructor(private httpGestorService: HttpGestorService) { }

  ngOnInit() {
    this.httpGestorService.obtenerGestores().subscribe(gestores => this.gestores = gestores);
  }

  agregarGestor(gestor: Gestor) {
    this.gestores.push(gestor);
    this.nuevo = gestor.id;
    setTimeout(() => {
      this.nuevo = null;
    }, 2000);
  }
}
