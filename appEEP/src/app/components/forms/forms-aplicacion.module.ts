import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';

import { BotonesComponent } from './botones/botones.component';

@NgModule({
  declarations: [BotonesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [BotonesComponent],
})
export class FormsAplicacionModule { }
