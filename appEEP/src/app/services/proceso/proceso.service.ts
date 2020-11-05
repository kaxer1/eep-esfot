import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {

  API_URL = 'http://localhost:3001/api/proceso';

  constructor(
    private http: HttpClient
  ) { }

  PostProcesoElectoral(data: any) {
    return this.http.post<any>(`${this.API_URL}/registrar-proceso`, data);
  }

  GetDatosTablaProcesoElectoral() {
    return this.http.get<any>(`${this.API_URL}/ver-registros`)
  }
}
