import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EstudiantesRoutingModule } from './estudiantes.routing';
import { EstudiantesComponent } from './estudiantes.component';

import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [
    EstudiantesComponent
  ],
  imports: [
    CommonModule,
    EstudiantesRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class EstudiantesModule { }
