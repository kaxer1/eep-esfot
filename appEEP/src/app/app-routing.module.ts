import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

// componentes
import { EstadisticaComponent } from './components/estadistica/estadistica.component';
import { LoginComponent } from './components/login/login.component';
import { PrincipalEstudianteComponent } from './components/user-estudiantes/principal-estudiante/principal-estudiante.component';
import { PrincipalAdminComponent } from './components/user-admin/principal-admin/principal-admin.component';
import { ProcesoElectoralComponent } from './components/user-admin/proceso-electoral/proceso-electoral.component';
import { ListasComponent } from './components/user-admin/listas/listas.component';
import { CandidatosComponent } from './components/user-admin/candidatos/candidatos/candidatos.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard], data: { log: false } },
  { path: 'votos-live', component: EstadisticaComponent, canActivate: [AuthGuard], data: { log: false } },
  // paginas de Admin
  { path: 'home-admin', component: PrincipalAdminComponent, canActivate: [AuthGuard], data: { rol: 1 } },
  { path: 'proceso-electoral', component: ProcesoElectoralComponent, canActivate: [AuthGuard], data: { rol: 1 } },
  { path: 'listas/:id_proceso', component: ListasComponent, canActivate: [AuthGuard], data: { rol: 1 }},
  { path: 'candidatos/:id_lista', component: CandidatosComponent, canActivate: [AuthGuard], data: { rol: 1 }},
  
  // paginas de Estudiante
  { path: 'home-estudiante', component: PrincipalEstudianteComponent, canActivate: [AuthGuard], data: { rol: 2 } },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
