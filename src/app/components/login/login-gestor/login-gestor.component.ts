import { Component, OnInit } from '@angular/core';
import { HttpGestorService } from '../../../services/http-gestor.service';
import { RouterModule, Router } from '@angular/router';
import { AlertService } from '../../../services/alert.service';
import { TIPO_ALERTA } from '../../../data/alerta';

@Component({
  selector: 'app-login-gestor',
  templateUrl: './login-gestor.component.html',
  styleUrls: ['./login-gestor.component.css']
})
export class LoginGestorComponent implements OnInit {

  constructor(
    private httpGestorService: HttpGestorService,
    private alertService: AlertService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onLogin(usuarioInput: HTMLInputElement, passwordInput: HTMLInputElement) {

    (async () => {

      try {
        await this.httpGestorService.login(usuarioInput.value, passwordInput.value).toPromise();
        this.router.navigate(['/gestores']);
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
