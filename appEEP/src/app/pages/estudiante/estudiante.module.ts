import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstudianteRoutingModule } from './estudiante-routing.module';
import { EstudianteComponent } from './estudiante.component';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { PrincipalEstudianteComponent } from './principal-estudiante/principal-estudiante.component';

@NgModule({
  declarations: [
    EstudianteComponent,
    PrincipalEstudianteComponent
  ],
  imports: [
    CommonModule,
    EstudianteRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule
  ]
})
export class EstudianteModule { }
