import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestoresComponent } from './components/gestores/gestores.component';


const appRoutes: Routes = [
  { path: 'gestores', component: GestoresComponent },
  { path: '', redirectTo: '/gestores', pathMatch: 'full' },
  { path: '**', component: GestoresComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
