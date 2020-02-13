import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { GestoresComponent } from './components/gestores/gestores.component';
import { GestoresAgregarComponent } from './components/gestores/agregar/gestores-agregar.component';
import { GestoresListarComponent } from './components/gestores/listar/gestores-listar.component';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GestoresAgregarComponent,
    GestoresListarComponent,
    GestoresComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
