import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { catchError, throwError } from "rxjs";

type RegisterPayload = {
  displayName: string;
  email: string;
  password: string;
};

type RegisterResponse = {
  displayName: string;
  email: string;
};

@Injectable({ providedIn: 'root' })
export class AuthService {

  private http = inject(HttpClient);
  private base = environment.apiBase;

  register(body: RegisterPayload) {
    return this.http.post<RegisterResponse>(`${this.base}/auth/register`
      , body).pipe(
        catchError(err => {
          const msg = err?.error?.message || 'No se pudo registrar';
          return throwError(() => new Error(msg));
        })
      );
  }

}
