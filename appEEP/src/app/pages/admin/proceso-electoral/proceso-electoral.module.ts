import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';

import { ProcesoElectoralRoutingModule } from './proceso-electoral.routing';
import { ProcesoElectoralComponent } from './proceso-electoral.component';

import { ProcesosPipe } from '../../../pipes/procesos.pipe';
import { FormsAplicacionModule } from '../../../components/forms/forms-aplicacion.module';

@NgModule({
  declarations: [
    ProcesoElectoralComponent,
    ProcesosPipe
  ],
  imports: [
    CommonModule,
    ProcesoElectoralRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsAplicacionModule
  ]
})
export class ProcesoElectoralModule { }
