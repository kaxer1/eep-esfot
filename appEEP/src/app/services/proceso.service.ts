import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Proceso } from '../interfaces/proceso.interface';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {

  API_URL = environment.url + '/proceso';

  private handleError(error: any) {
    console.log('ERROR CAPTURADO: ', error);
    this.toastr.error(error.error.message)
    return throwError(error);
  }

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  PostProcesoElectoral(data: any) {
    return this.http.post<any>(`${this.API_URL}/registrar-proceso`, data)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      )
  }

  GetDatosTablaProcesoElectoral() {
    return this.http.get<any>(`${this.API_URL}/ver-registros`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      )
  }

  infoProcesoToUsuarios(): Observable<Proceso> {
    const url = `${this.API_URL}/proceso-actual`;
    return this.http.get<Proceso>(url)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      )
  }


}
