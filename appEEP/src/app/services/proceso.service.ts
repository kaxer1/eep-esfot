import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Proceso } from '../interfaces/proceso.interface';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {

  API_URL = environment.url + '/proceso';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  PostProcesoElectoral(data: any) {
    return this.http.post<any>(`${this.API_URL}/registrar-proceso`, data);
  }

  GetDatosTablaProcesoElectoral() {
    return this.http.get<any>(`${this.API_URL}/ver-registros`)
  }


  private proceso: Proceso;

  public get infoProceso(): Proceso {
    return this.proceso
  }


  infoProcesoToUsuarios() {
    this.http.get<any>(`${this.API_URL}/proceso-actual`).subscribe((res: Proceso) => {
      this.proceso = res
    }, err => {
      console.log(err);
      this.toastr.error(err.error.message)
    })
  }


}
