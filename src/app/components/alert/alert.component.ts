import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { Alerta } from '../../data/alerta';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  texto: string;
  tipo: string;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertService.getAlertas().subscribe((alerta: Alerta) => {
      this.texto = alerta.texto;
      this.tipo = alerta.tipo;

      if (alerta.tiempo) {
        setTimeout(() => {
          this.texto = '';
        }, alerta.tiempo);
      }
    });
  }
}
