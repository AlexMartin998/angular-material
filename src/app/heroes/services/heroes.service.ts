import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

import { Hero } from '../interfaces/heroe.interface';
import { environments } from './../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHeroById(id: string): Observable<Hero | undefined> {
    return (
      this.http
        .get<Hero>(`${this.baseUrl}/heroes/${id}`)
        // si da error retorno 1 obs de undefine, esto se podria manejar de != formas analizando el err
        .pipe(catchError((err) => of(undefined))) // espera retornar 1 obs, x eso el   of()
    );
  }
}
