import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Cambiar el local de la APP
import localEsEC from '@angular/common/locales/es-EC'
import { registerLocaleData } from '@angular/common'
registerLocaleData(localEsEC)

// GUARDS
import { AuthGuard } from './guards/auth.guard';

// SERVICIOS
import { TokenInterceptorService } from './services/login/token-interceptor.service';
import { VotosService } from './services/votos.service';
import { LoginService } from './services/login/login.service';
import { UserService } from './services/user.service';
import { ProcesoService } from './services/proceso.service';
import { ListaService } from './services/lista.service';
import { CandidaturaService } from './services/candidatura.service';

// PIPE
import { ProcesosPipe } from './pipes/procesos.pipe';

// COMPONENTES
import { AppComponent } from './app.component';
import { NavComponent } from './components/elementos/nav/nav.component';
import { FooterComponent } from './components/elementos/footer/footer.component';
import { MainNavComponent } from './components/elementos/main-nav/main-nav.component';
import { LoginComponent } from './components/login/login.component';
import { EstadisticaComponent } from './components/estadistica/estadistica.component';
import { PrincipalAdminComponent } from './components/user-admin/principal-admin/principal-admin.component';
import { PrincipalEstudianteComponent } from './components/user-estudiantes/principal-estudiante/principal-estudiante.component';
import { ProcesoElectoralComponent } from './components/user-admin/proceso-electoral/proceso-electoral.component';
import { ListasComponent } from './components/user-admin/listas/listas.component';
import { RegistrarListasComponent } from './components/user-admin/listas/registrar-listas/registrar-listas.component';
import { CandidatosComponent } from './components/user-admin/candidatos/candidatos/candidatos.component';
import { EstudiantesComponent } from './components/user-admin/estudiantes/estudiantes.component'
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MainNavComponent,
    LoginComponent,
    EstadisticaComponent,
    PrincipalAdminComponent,
    PrincipalEstudianteComponent,
    NavComponent,
    ProcesoElectoralComponent,
    ListasComponent,
    ProcesosPipe,
    RegistrarListasComponent,
    CandidatosComponent,
    EstudiantesComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MaterialModule,

  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    VotosService,
    LoginService,
    UserService,
    ProcesoService,
    ListaService,
    CandidaturaService,
    {
      provide: LOCALE_ID, useValue: 'es-EC'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }