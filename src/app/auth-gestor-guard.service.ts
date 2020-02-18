import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from './services/autenticacion.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGestorGuard implements CanActivate {

  constructor(private authService: AutenticacionService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {

    // autenticación incorrecta
    if (!this.authService.estaGestorAutenticado()) {

      // redirección hacia la página principal
      this.router.navigate(['/']);
      return false;
    }

    // autenticación correcta
    return true;
  }
}
