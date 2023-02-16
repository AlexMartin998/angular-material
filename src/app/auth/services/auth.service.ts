import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environments } from '../../../environments/environments';
import { User } from '../interfaces';
import { Observable, tap, of, map, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environments.baseUrl;
  private user?: User; // cuando ini la app es null

  constructor(private readonly http: HttpClient) {}

  get currectUser(): User | undefined {
    if (!this.user) return undefined;

    return structuredClone(this.user); // deep clone
  }

  login(email: string, password: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap((user) => (this.user = user)),

      // los tokens deberian guardarse en cookies q pasen x https
      tap((user) => localStorage.setItem('token', 'SN#@#JADJN!(DFJKLN4'))
    );
  }

  checkAuth(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);
    const token = localStorage.getItem('token');

    return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap((user) => (this.user = user)),
      map((user) => !!user), // asegurarse q es un bool true
      catchError((err) => of(false))
    );
  }

  logout(): void {
    this.user = undefined;
    localStorage.clear();
  }
}
