import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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

const appRoutes: Routes = [
  { path: 'gestores', component: GestoresComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'mensajes', component: MensajesComponent },
  { path: 'transferencias', component: TransferenciasComponent },
  { path: 'cliente/info', component: ClienteInfoComponent },
  { path: 'cliente/transferencias', component: ClienteTransferenciaComponent },
  { path: 'cliente/ingreso', component: ClienteIngresoComponent },
  { path: 'login/cliente', component: LoginClienteComponent },
  { path: 'login/gestor', component: LoginGestorComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
