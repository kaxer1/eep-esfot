import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';

import { EstadisticaComponent } from './estadistica/estadistica.component';
import { PrincipalAdminComponent } from './principal-admin/principal-admin.component';
import { ProcesoElectoralComponent } from './proceso-electoral/proceso-electoral.component';
import { ListasComponent } from './listas/listas.component';
import { CandidatosComponent } from './candidatos/candidatos.component';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { AdminComponent } from './admin.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'home-admin', component: PrincipalAdminComponent, canActivate: [AuthGuard], data: { rol: 1 } },
      { path: 'votos-live', component: EstadisticaComponent, canActivate: [AuthGuard], data: { rol: 1 } },
      { path: 'proceso-electoral', component: ProcesoElectoralComponent, canActivate: [AuthGuard], data: { rol: 1 } },
      { path: 'listas/:id_proceso', component: ListasComponent, canActivate: [AuthGuard], data: { rol: 1 } },
      { path: 'candidatos/:id_lista', component: CandidatosComponent, canActivate: [AuthGuard], data: { rol: 1 } },
      { path: 'estudiantes', component: EstudiantesComponent, canActivate: [AuthGuard], data: { rol: 1 } },
      {
        path: '',
        redirectTo: '/admin/home-admin',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
