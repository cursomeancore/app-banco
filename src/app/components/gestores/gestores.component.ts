import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { TIPO_ALERTA } from '../../data/alerta';
import { HttpGestorService } from '../../services/http-gestor.service';

@Component({
  selector: 'app-gestores',
  templateUrl: './gestores.component.html',
  styleUrls: ['./gestores.component.css']
})
export class GestoresComponent implements OnInit {

  constructor(private alertService: AlertService, private httpGestorService: HttpGestorService) {

  }

  ngOnInit() { }
}
