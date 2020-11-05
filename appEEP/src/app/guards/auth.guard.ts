import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    if (this.loginService.loggedIn()) {
      console.log('Esta logeado');
      if (this.loginService.getRol() === route.data.rol) {
        return true;
      }
      
      if (this.loginService.getRol() != route.data.rol) {

        if (this.loginService.getRol() === 1) {
          this.router.navigate(['/home-admin']);
          return true;
        }
        if (this.loginService.getRol() === 2) {
          this.router.navigate(['/home-estudiante']);
          return true;
        }
      }
    }

    if(!this.loginService.loggedIn()){
      console.log('No esta logeado');
      if (this.loginService.loggedRol() === route.data.log){
        return true;
      }
    }    
    
    this.router.navigate(['/login']);
    return false;
  }
  
}
