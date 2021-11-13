import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { LoginResp, User } from '../../interfaces/user.iterface';
import { DataCentralService } from '../../libs/data-central.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API_URL = environment.url;
  // 

  public get user(): User {
    return this.dcentral.user
  }

  constructor(
    private http: HttpClient,
    public router: Router,
    private dcentral: DataCentralService
  ) { }

  singin(credenciales: any) {
    return this.http.post<LoginResp>(`${this.API_URL}/auth/signin`, credenciales);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  loggedRol() {
    return (this.user.rol) ? true : false;
  }

  getRol() {
    return this.user.rol;//Empleado
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
