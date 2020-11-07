import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// MATERIAL
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'
import { MatTableModule } from '@angular/material/table';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// GUARDS
import { AuthGuard } from './guards/auth.guard';

// SERVICIOS
import { TokenInterceptorService } from './services/login/token-interceptor.service';
import { VotosService } from './services/votos/votos.service';
import { LoginService } from './services/login/login.service';
import { UserService } from './services/user/user.service';
import { ProcesoService } from './services/proceso/proceso.service';
import { ListaService } from './services/lista-canditatos/lista.service';
import { CandidaturaService } from './services/candidatura/candidatura.service';

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
import { CandidatosComponent } from './components/user-admin/candidatos/candidatos/candidatos.component'

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
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatTreeModule,
    MatMenuModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    // { provide: DateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_LOCALE, useValue: 'es' },
    VotosService,
    LoginService,
    UserService,
    ProcesoService,
    ListaService,
    CandidaturaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }