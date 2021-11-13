import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalEstudianteComponent } from './principal-estudiante/principal-estudiante.component';
import { AuthGuard } from '../../guards/auth.guard';
import { EstudianteComponent } from './estudiante.component';

const routes: Routes = [
  {
    path: '',
    component: EstudianteComponent,
    children: [
      { path: 'home-estudiante', component: PrincipalEstudianteComponent, canActivate: [AuthGuard], data: { rol: 2 } },
      {
        path: '',
        redirectTo: '/estudiante/home-estudiante',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudianteRoutingModule { }
