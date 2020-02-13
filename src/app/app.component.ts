import { Component, OnInit } from '@angular/core';
import { HttpClienteService } from './services/http-cliente.service';
import { HttpGestorService } from './services/http-gestor.service';
import { AutenticacionService } from './services/autenticacion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private httpClienteService: HttpClienteService,
    private httpGestorService: HttpGestorService,
    private autenticacionService: AutenticacionService) { }

  ngOnInit(): void {

    this.autenticacionService.getAlertasCliente().subscribe(autenticado => {
      console.log(autenticado);
    });

    this.autenticacionService.getAlertasGestor().subscribe(autenticado => {
      console.log(autenticado);
    });

    (async () => {

      try {

        await this.httpGestorService.login('gestor2', 'gestor1').toPromise();
        console.log(await this.httpGestorService.obtenerGestores().toPromise());

      } catch (err) {
        console.log(err);
      }

      try {

        await this.httpClienteService.login('cliente1', 'cliente1').toPromise();
        console.log(await this.httpClienteService.obtenerInfo().toPromise());

      } catch (err) {
        console.log(err);
      }
    })();
  }
}
