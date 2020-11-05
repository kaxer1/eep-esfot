import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login/login.service';
import { Md5 } from 'ts-md5/dist/md5';

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
    private toastr: ToastrService,
    private router: Router
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
      var iniciales: string = res.User.nombre.slice(0,1) + res.User.apellido.slice(0,1)

      localStorage.setItem('token', res.Authorization)
      localStorage.setItem('rol', res.User.rol)
      localStorage.setItem('id', res.User.id)
      localStorage.setItem('fullname', res.User.nombre + ' ' + res.User.apellido)
      localStorage.setItem('username', res.User.username)
      localStorage.setItem('iniciales', iniciales)
      localStorage.setItem('email', form.email)
      console.log(res.User);

      if (res.User.rol === 1) {
        this.router.navigate(['/home-admin'])
      } else if (res.User.rol === 2) {
        this.router.navigate(['/home-estudiante'])
      }

      // console.log(res.Authorization);
      this.toastr.success('Ingreso Exitoso', res.User.username);
    }, err => {      
      this.toastr.error(err.error.message);
    })
  }

}
