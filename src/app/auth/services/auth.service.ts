import { Observable, tap, of, map, catchError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from 'src/env/env';
import { User } from '../interfaces/user.interface';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl = env.baseUrl;
  private user?: User;


  constructor(private http: HttpClient) { }

  get currentUser(): User| undefined{
    if(!this.user) return undefined;

    return structuredClone(this.user);
  }

  login(email: string, pass: string): Observable<User>{

    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        tap(user => localStorage.setItem('token', 'asfSJIAjsi.asdfvsd.advas'))
      )
  }

  checkAuthentication(): Observable<boolean>{
    if(!localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token');

    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        map(user => !!user),
        catchError( err => of(false))
      );

  }

  logout(){
    this.user = undefined;
    localStorage.clear();
  }


}
