import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';

import { AuthResponse, Usuario } from '../interfaces/interfaces';
import { of } from 'rxjs';

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
            this._usuario = {
              _id: resp.usuario!._id,
              nombre: resp.usuario!.nombre,
              correo: resp.usuario!.correo,
              password: resp.usuario!.password,
            }
          }
        }),
        map((resp) => resp.ok),
        catchError((err) => of(err.error.msg))
      );
  }
}
