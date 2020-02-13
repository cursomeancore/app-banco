import { Component, OnInit } from '@angular/core';
import { HttpClienteService } from './services/http-cliente.service';
import { HttpGestorService } from './services/http-gestor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private httpClienteService: HttpClienteService,
    private httpGestorService: HttpGestorService) { }

  ngOnInit(): void {
    (async () => {

      try {

        await this.httpGestorService.login('gestor1', 'gestor1').toPromise();
        console.log(await this.httpGestorService.obtenerGestores().toPromise());

        await this.httpClienteService.login('cliente1', 'cliente1').toPromise();
        console.log(await this.httpClienteService.obtenerInfo().toPromise());

      } catch (err) {
        console.log(err);
      }
    })();
  }
}
