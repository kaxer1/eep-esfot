import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VotosService {

  API_URL = environment.url + '/voto';
  // http://localhost:3001/api/voto/ver

  constructor(
    private http: HttpClient
  ) { }

  getVotosTotales() {
    return this.http.get<any>(`${this.API_URL}/ver`);
  }

  postVotoUsuario(data) {
    return this.http.post<any>(`${this.API_URL}/registrar`, data);
  }

}
