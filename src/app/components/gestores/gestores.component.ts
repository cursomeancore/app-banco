import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { TIPO_ALERTA } from '../../data/alerta';

@Component({
  selector: 'app-gestores',
  templateUrl: './gestores.component.html',
  styleUrls: ['./gestores.component.css']
})
export class GestoresComponent implements OnInit {

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    /*this.alertService.enviarAlerta({
      texto: 'Esto es un mensaje de prueba',
      tipo: TIPO_ALERTA.DANGER,
      tiempo: 2000,
    });*/
  }
}
