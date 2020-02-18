import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AutenticacionService } from './services/autenticacion.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuardService implements CanActivate {

  constructor(private authService: AutenticacionService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {

    // es un cliente
    if (this.authService.estaClienteAutenticado()) {
      this.router.navigate(['/cliente/info']);
      return true;
    }

    if (this.authService.estaGestorAutenticado()) {
      this.router.navigate(['/gestores']);
      return true;
    }

    // es un anónimo
    this.router.navigate(['/login/gestor']);
    return true;
  }
}

