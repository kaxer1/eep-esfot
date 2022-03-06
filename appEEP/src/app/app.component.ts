import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataCentralService } from './libs/data-central.service';
import { LoginService } from './services/login/login.service';
import { User } from './interfaces/user.iterface';
import { Menu } from './interfaces/menu.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'appEEP';

  public get muser(): User {
    return this.dcentral.user
  }

  public get mmenu(): Menu[] {
    return this.dcentral.menu
  }

  public get login(): boolean {
    return this.loginService.login;
  }

  constructor(
    public router: Router,
    public location: Location,
    private loginService: LoginService,
    private dcentral: DataCentralService,
  ) { }

  ngOnInit() {
    this.loginService.setlogin(false);
    if ((localStorage.getItem('d') !== undefined && localStorage.getItem('d') !== null) || (localStorage.getItem('token') !== 'undefined' && localStorage.getItem('token') !== null && localStorage.getItem('token') !== '')) {
      this.loginService.setlogin(true);
      this.ejecutarPermisos();
    }
  }

  async ejecutarPermisos() {
    try {
      this.dcentral.desencriptarDataUser();
      await this.dcentral.ConsultarMenu().subscribe(resp => {
        this.dcentral.setMenuRol(resp.menu);
      });
    } catch (error) { }

    if (this.muser == null || this.muser === undefined) {
      return;
    }
    this.iniciarAmbiente(this.muser);

  }

  iniciarAmbiente(user: User) {
    console.log(user);
    console.log(this.mmenu);

  }

}
