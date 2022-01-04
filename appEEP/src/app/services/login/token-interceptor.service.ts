import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { DataCentralService } from '../../libs/data-central.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private dcentral: DataCentralService,
    private loginServices: LoginService
  ) { }

  // con esta clase me ayuda añadir la cabecera de autorizacion en cada peticion que se realice a la API
  intercept(req, next) {
    this.dcentral.setLoading(true);
    const tokenizeReq = req.clone({
      setHeaders: {
        // Authorization: `${this.loginServices.getToken()}`
        Authorization: `Bearer ${this.loginServices.getToken()}`
      }
    });
    return next.handle(tokenizeReq);
  }
  
}
