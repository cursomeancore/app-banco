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
import { LoginGestorComponent } from './components/login/login-gestor/login-gestor.component';
import { LoginClienteComponent } from './components/login/login-cliente/login-cliente.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { MensajesComponent } from './components/mensajes/mensajes.component';
import { TransferenciasComponent } from './components/transferencias/transferencias.component';
import { ClienteInfoComponent } from './components/cliente-info/cliente-info.component';
import { ClienteIngresoComponent } from './components/cliente-ingreso/cliente-ingreso.component';
import { ClienteTransferenciaComponent } from './components/cliente-transferencia/cliente-transferencia.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ClientesListarComponent } from './components/clientes/listar/clientes-listar.component';
import { ClientesAgregarComponent } from './components/clientes/agregar/clientes-agregar.component';
import { MensajesEnviarComponent } from './components/mensajes/enviar/mensajes-enviar.component';
import { MensajesEnviadosComponent } from './components/mensajes/enviados/mensajes-enviados.component';
import { MensajesRecibidosComponent } from './components/mensajes/recibidos/mensajes-recibidos.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GestoresAgregarComponent,
    GestoresListarComponent,
    GestoresComponent,
    AlertComponent,
    LoginGestorComponent,
    LoginClienteComponent,
    ClientesComponent,
    MensajesComponent,
    TransferenciasComponent,
    ClienteInfoComponent,
    ClienteIngresoComponent,
    ClienteTransferenciaComponent,
    NotFoundComponent,
    ClientesListarComponent,
    ClientesAgregarComponent,
    MensajesEnviarComponent,
    MensajesEnviadosComponent,
    MensajesRecibidosComponent
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
