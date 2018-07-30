import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username, password) {
    const token = this.generateBasicAuthToken(username, password);
    const headers = new HttpHeaders()
      .set('Authorization', `Basic ${token}`);

    return this.http
      .get('http://localhost:8080/authenticate', {headers})
      .pipe(
        tap((res) => {
          localStorage.setItem('token' , token);
          return res;
        }),
        catchError((err: any) => {
          console.log(err);
          return throwError('KABOOM');
        })
      );
  }

  register(user) {
    return this.http.post('http://localhost:8080/register', user)
    .pipe(
        tap((res) => {
          this.login(user.username, user.password);
        }),
        catchError((err: any) => {
          console.log(err);
          return throwError('KABOOM');
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

  checkLogin() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  generateBasicAuthToken(username, password) {
    return btoa(`${username}:${password}`);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
