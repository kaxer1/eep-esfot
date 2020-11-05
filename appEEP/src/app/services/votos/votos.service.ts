import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VotosService {

  API_URL = 'http://localhost:3001/api/voto';
  // http://localhost:3001/api/voto/ver

  constructor(
    private http: HttpClient
  ) { }

  getVotosTotales() {
    return this.http.get<any>(`${this.API_URL}/ver`);
  }

}
