import { Component, OnInit } from '@angular/core';
import { TIPO_ALERTA } from '../../../data/alerta';
import { Router } from '@angular/router';
import { HttpClienteService } from '../../../services/http-cliente.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-login-cliente',
  templateUrl: './login-cliente.component.html',
  styleUrls: ['./login-cliente.component.css']
})
export class LoginClienteComponent implements OnInit {

  constructor(
    private htpClienteService: HttpClienteService,
    private alertService: AlertService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onLogin(usuarioInput: HTMLInputElement, passwordInput: HTMLInputElement) {

    (async () => {

      try {
        await this.htpClienteService.login(usuarioInput.value, passwordInput.value).toPromise();
        this.router.navigate(['/']);
      } catch (err) {
        passwordInput.value = '';
        this.alertService.enviarAlerta({
          texto: err,
          tiempo: 2000,
          tipo: TIPO_ALERTA.DANGER
        });
      }
    })();
  }
}
