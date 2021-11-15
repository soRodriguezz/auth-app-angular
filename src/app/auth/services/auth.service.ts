import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';

import { AuthResponse, Usuario } from '../interfaces/interfaces';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _usuario!: Usuario;

  get usuario() {
    return { ...this._usuario };
  }

  constructor(private http: HttpClient) {}

  login(correo: string, password: string) {
    return this.http
      .post<AuthResponse>(`${environment.baseURL}/auth`, { correo, password })
      .pipe(
        tap((resp) => {
          if (resp.ok === true) {
            localStorage.setItem('token', resp.token!);
            
            this._usuario = {
              _id: resp.usuario!._id,
              nombre: resp.usuario!.nombre,
              correo: resp.usuario!.correo,
              password: resp.usuario!.password,
            };
          }
        }),
        map((resp) => resp.ok),
        catchError((err) => of(err.error.msg))
      );
  }

  validarToken(): Observable<boolean> {
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.http
      .get<any>(`${environment.baseURL}/auth/renovar`, { headers }) // enviar headers en la peticion
      .pipe(
        map( ( resp ) => {
          localStorage.setItem('token', resp.token!);
          
          this._usuario = {
            _id: resp.uid,
            nombre: resp.nombre,
          };

          return resp.ok;
        }),
        catchError( ( err ) => of( false ) )
      );
  }
}
