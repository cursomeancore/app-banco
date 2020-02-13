import { Component, OnInit } from '@angular/core';
import { HttpClienteService } from './services/http-cliente.service';
import { HttpGestorService } from './services/http-gestor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private httpGestorService: HttpGestorService, private httpClienteService: HttpClienteService) {

  }

  ngOnInit(): void {

    (async () => {
      await this.httpGestorService.login('gestor1', 'gestor1').toPromise();
      console.log(await this.httpGestorService.obtenerGestores().toPromise());

      await this.httpClienteService.login('cliente1', 'cliente1').toPromise();
      console.log(await this.httpClienteService.obtenerInfo().toPromise());
    })();
  }
}
