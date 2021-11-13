import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../material/material.module';

import { ProcesosPipe } from '../../pipes/procesos.pipe';

import { ProcesoElectoralComponent } from './proceso-electoral/proceso-electoral.component';
import { PrincipalAdminComponent } from './principal-admin/principal-admin.component';
import { ListasComponent } from './listas/listas.component';
import { RegistrarListasComponent } from './listas/registrar-listas/registrar-listas.component';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { CandidatosComponent } from './candidatos/candidatos.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';


@NgModule({
  declarations: [
    AdminComponent,
    ProcesoElectoralComponent,
    PrincipalAdminComponent,
    ListasComponent,
    RegistrarListasComponent,
    EstudiantesComponent,
    CandidatosComponent,
    EstadisticaComponent,

    ProcesosPipe,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule
  ]
})
export class AdminModule { }
