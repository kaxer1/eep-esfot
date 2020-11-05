import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'appEEP';

  constructor(
    public router: Router,
    public location: Location,
    // public loginServices: LoginService,
  ){ }

  removerLogin(){
    var tituloPestania = this.location.prepareExternalUrl(this.location.path());
    tituloPestania = tituloPestania.slice(1);
    if (tituloPestania === 'login'){
      return false;
    } else {
      return true;
    }
  }

  removerEstadistica(){
    var tituloPestania = this.location.prepareExternalUrl(this.location.path());
    tituloPestania = tituloPestania.slice(1);
    if (tituloPestania === 'voto-live'){
      return false;
    } else {
      return true;
    }
  }

  removerMain(){
    var tituloPestania = this.location.prepareExternalUrl(this.location.path());
    // console.log(tituloPestania.slice(1).split("/")[0]);
    tituloPestania = tituloPestania.slice(1).split("/")[0];    
    if (tituloPestania === 'voto-live' || tituloPestania === 'login'){
      return true;
    } else {
      return false;
    }
  }

}
