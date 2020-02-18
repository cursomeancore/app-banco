import { Component, OnInit } from '@angular/core';
import { HttpGestorService } from '../../../services/http-gestor.service';
import { Gestor } from './../../../models/gestor';
import { AutenticacionService } from '../../../services/autenticacion.service';
import { AlertService } from '../../../services/alert.service';
import { TIPO_ALERTA } from '../../../data/alerta';


@Component({
  selector: 'app-gestores-listar',
  templateUrl: './gestores-listar.component.html',
  styleUrls: ['./gestores-listar.component.css']
})
export class GestoresListarComponent implements OnInit {

  gestores: Gestor[];
  nuevo: number;

  constructor(private httpGestorService: HttpGestorService,
              private autenticacionService: AutenticacionService,
              private alertService: AlertService) { }

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

  onEliminarGestor(gestorParaEliminar: Gestor) {

    if (gestorParaEliminar.usuario === this.autenticacionService.usuarioGestor) {
      return this.alertService.enviarAlerta({
        texto: 'No puede eliminarse el gestor autenticado',
        tipo: TIPO_ALERTA.DANGER,
        tiempo: 2000
      });
    }

    this.httpGestorService.eliminarGestorPorId(gestorParaEliminar.id).subscribe(() => {
      this.gestores = this.gestores.filter(gestor => gestor.id !== gestorParaEliminar.id);
    });
  }
}
