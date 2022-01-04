import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

// componentes
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { RecuperarPasswordComponent } from './pages/login/recuperar-password/recuperar-password.component';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'recuperar', component: RecuperarPasswordComponent, canActivate: [AuthGuard] },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
  //   canActivate: [AuthGuard],
  //   data: { log: false }
  // },
  // Administradores
  { path: 'candidatos/:id', loadChildren: () => import('src/app/pages/admin/candidatos/candidatos.module').then(m => m.CandidatosModule), canActivate: [AuthGuard] },
  { path: 'votos-live', loadChildren: () => import('src/app/pages/admin/estadistica/estadistica.module').then(m => m.EstadisticaModule), canActivate: [AuthGuard] },
  { path: 'estudiantes', loadChildren: () => import('src/app/pages/admin/estudiantes/estudiantes.module').then(m => m.EstudiantesModule), canActivate: [AuthGuard] },
  { path: 'proceso-electoral', loadChildren: () => import('src/app/pages/admin/proceso-electoral/proceso-electoral.module').then(m => m.ProcesoElectoralModule), canActivate: [AuthGuard] },
  { path: 'listas/:id', loadChildren: () => import('src/app/pages/admin/listas/listas.module').then(m => m.ListasModule), canActivate: [AuthGuard] },
  
  // estudiantes
  { path: 'home-estudiante', loadChildren: () => import('src/app/pages/estudiante/principal-estudiante/principal-estudiante.module').then(m => m.PrincipalEstudianteModule), canActivate: [AuthGuard] },

  // {
  //   path: 'estudiante',
  //   loadChildren: () => import('./pages/estudiante/estudiante.module').then(m => m.EstudianteModule),
  //   canActivate: [AuthGuard],
  //   data: { rol: 2 }
  // },
  
  //Wild Card Route for 404 request
  { path: '**', pathMatch: 'full', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
