import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../material/material.module';

import { LoginComponent } from './login.component';
import { RecuperarPasswordComponent } from './recuperar-password/recuperar-password.component';

@NgModule({
  declarations: [LoginComponent, RecuperarPasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    SharedModule,
    MaterialModule
  ],
  exports: [LoginComponent, RecuperarPasswordComponent]
})
export class LoginModule { }
