import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

// componentes
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { RecuperarPasswordComponent } from './pages/login/recuperar-password/recuperar-password.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'recuperar',
    component: RecuperarPasswordComponent
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    canActivate: [AuthGuard],
    data: { log: false }
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard],
    data: { rol: 1 }
  },
  {
    path: 'estudiante',
    loadChildren: () => import('./pages/estudiante/estudiante.module').then(m => m.EstudianteModule),
    canActivate: [AuthGuard],
    data: { rol: 2 }
  },

  //Wild Card Route for 404 request
  {
    path: '**', pathMatch: 'full',
    component: ErrorPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
