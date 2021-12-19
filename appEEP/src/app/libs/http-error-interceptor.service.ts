import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {
  constructor(private toastr: ToastrService, private login: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
          if (evt.body && evt.body.cod == "OK")
            this.toastr.success(evt.body.message, "", { positionClass: 'toast-bottom-center' });
        }
      }),
      catchError(error => {
        let errorMessage = '';
        if (error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Client-side error: ${error.error.message}`;
        } else {
          // backend error
          errorMessage = `Server-side error: ${error.status} ${error.message}`;
          if (error.status === 401) {
            this.login.logout()
          }
        }

        // Muestra el mensaje de error.
        this.toastr.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}