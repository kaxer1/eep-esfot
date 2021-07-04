import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API_URL = environment.url;
  // 

  constructor(
    private http: HttpClient,
    public router: Router
  ) { }

  singin(credenciales: any) {
    return this.http.post<any>(`${this.API_URL}/auth/signin`, credenciales);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  loggedRol() {
    return !!localStorage.getItem('rol');
  }

  getRol() {
    return parseInt(localStorage.getItem('rol'));//Empleado
  }

  getRolMenu() {
    let rol = parseInt(localStorage.getItem('rol'));
    if (rol === 1) {
      return true;//Admin
    }
    return false;//Empleado
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['/']);
  }
}
