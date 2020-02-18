import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { GestoresComponent } from './components/gestores/gestores.component';
import { LoginClienteComponent } from './components/login/login-cliente/login-cliente.component';
import { LoginGestorComponent } from './components/login/login-gestor/login-gestor.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { MensajesComponent } from './components/mensajes/mensajes.component';
import { TransferenciasComponent } from './components/transferencias/transferencias.component';
import { ClienteInfoComponent } from './components/cliente-info/cliente-info.component';
import { ClienteIngresoComponent } from './components/cliente-ingreso/cliente-ingreso.component';
import { ClienteTransferenciaComponent } from './components/cliente-transferencia/cliente-transferencia.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGestorGuard } from './auth-gestor-guard.service';
import { AuthClienteGuard } from './auth-cliente-guard.service';
import { RedirectGuardService } from './redirect-guard.service';

const appRoutes: Routes = [
  { path: 'gestores', canActivate: [AuthGestorGuard], component: GestoresComponent },
  { path: 'clientes', canActivate: [AuthGestorGuard], component: ClientesComponent },
  { path: 'mensajes', canActivate: [AuthGestorGuard], component: MensajesComponent },
  { path: 'transferencias', canActivate: [AuthGestorGuard], component: TransferenciasComponent },
  { path: 'cliente/info', canActivate: [AuthClienteGuard], component: ClienteInfoComponent },
  { path: 'cliente/transferencias', canActivate: [AuthClienteGuard],  component: ClienteTransferenciaComponent },
  { path: 'cliente/ingreso', canActivate: [AuthClienteGuard], component: ClienteIngresoComponent },
  { path: 'login/cliente', component: LoginClienteComponent },
  { path: 'login/gestor', component: LoginGestorComponent },
  { path: '', canActivate: [RedirectGuardService], redirectTo: '',  pathMatch: 'full'},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
