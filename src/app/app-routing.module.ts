import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestoresComponent } from './components/gestores/gestores.component';
import { LoginClienteComponent } from './components/login/login-cliente/login-cliente.component';
import { LoginGestorComponent } from './components/login/login-gestor/login-gestor.component';


const appRoutes: Routes = [
  { path: 'gestores', component: GestoresComponent },
  { path: 'login/cliente', component: LoginClienteComponent, pathMatch: 'full' },
  { path: 'login/gestor', component: LoginGestorComponent, pathMatch: 'full' },
  { path: '', redirectTo: '/gestores', pathMatch: 'full' },
  { path: '**', component: GestoresComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
