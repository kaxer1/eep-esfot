import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';
import { Md5 } from 'ts-md5/dist/md5';
import { DataCentralService } from '../../libs/data-central.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  hide1 = true;

  emailCtrl = new FormControl('', [Validators.required, Validators.email]);
  passwordCtrl = new FormControl('', Validators.required);

  public CredencialesLoggin = new FormGroup({
    email: this.emailCtrl,
    password: this.passwordCtrl
  });

  constructor(
    public LoginService: LoginService,
    private dcentral: DataCentralService,
  ) {
    this.CredencialesLoggin.patchValue({
      email: '',
      password: ''
    })
  }

  ngOnInit() {

  }

  IniciarSession(form) {
    const md5 = new Md5();
    let clave = md5.appendStr(form.password).end();

    let dataUsuario = {
      email: form.email,
      password: clave
    };

    this.LoginService.singin(dataUsuario).subscribe(res => {

      if (res.cod === "ERROR") {
        return;
      }
      this.SuccessResponse(res);

    })
  }

  SuccessResponse(res) {
    this.dcentral.encriptarData(res);
    this.dcentral.desencriptarDataUser(); // es necesario para actualizacion rapida de los datos en el sistema.
    this.LoginService.setlogin(true);
    this.dcentral.setMenuRol(res.menu);
    
  }
}
