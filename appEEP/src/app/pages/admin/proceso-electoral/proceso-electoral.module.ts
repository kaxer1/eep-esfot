import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';

import { ProcesoElectoralRoutingModule } from './proceso-electoral.routing';
import { ProcesoElectoralComponent } from './proceso-electoral.component';

import { FormsAplicacionModule } from '../../../components/forms/forms-aplicacion.module';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    ProcesoElectoralComponent,
  ],
  imports: [
    CommonModule,
    ProcesoElectoralRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsAplicacionModule,
    PipesModule
  ]
})
export class ProcesoElectoralModule { }
