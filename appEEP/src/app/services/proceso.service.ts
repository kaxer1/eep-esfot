import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ProcesoListaResp, ProcesoResp } from '../interfaces/proceso.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {

  API_URL = environment.url + '/proceso';

  constructor(private http: HttpClient) { }

  PostProcesoElectoral(data: any) {
    return this.http.post<any>(`${this.API_URL}/registrar-proceso`, data)

  }

  GetDatosTablaProcesoElectoral() {
    return this.http.get<ProcesoListaResp>(`${this.API_URL}/ver-registros`)

  }

  infoProcesoToUsuarios() {
    const url = `${this.API_URL}/proceso-actual`;
    return this.http.get<ProcesoResp>(url)

  }


}
