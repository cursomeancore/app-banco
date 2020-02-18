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

  agregarGestor(gestor: Gestor): void {
    this.gestores.push(gestor);
    this.nuevo = gestor.id;
    setTimeout(() => {
      this.nuevo = null;
    }, 2000);
  }

  onEliminarGestor(id: number) {
    this.httpGestorService.eliminarGestorPorId(id).subscribe(() => {
      this.gestores = this.gestores.filter(gestor => gestor.id !== id);
    });
  }
}
