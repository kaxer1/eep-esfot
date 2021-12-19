import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CandidaturaService {

  API_URL = environment.url + '/candidatos';

  constructor(private http: HttpClient) { }


  ListaCandidatos(id_lista: number) {
    return this.http.get<any>(`${this.API_URL}/lista-candidatos/${id_lista}`)

  }

  RegistrarCandidatura(data: any) {
    return this.http.post<any>(`${this.API_URL}/registrar-candidato`, data)

  }

}
