import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { Todo } from './models/todo';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // private baseUrl = 'http://localhost:8080/'; // development
  // private baseUrl = '/TodoRest/';  // deployment
  // private url = this.baseUrl + 'api/todos';

  private url = environment.baseUrl + 'api/todos';

  index(): Observable<Todo[]> {
    if (!this.authService.checkLogin()) {
      this.router.navigateByUrl('home');
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  `Basic ${this.authService.getToken()}`
      })
    };


    return this.http.get<Todo[]>(this.url, httpOptions)
      .pipe(
        catchError((err: any) => {
         console.log(err);
         return throwError('KABOOM');
       })
     );
  }

  show(id): Observable<Todo> {
    if (!this.authService.checkLogin()) {
      this.router.navigateByUrl('home');
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  `Basic ${this.authService.getToken()}`
      })
    };

    return this.http.get<Todo>(`${this.url}/${id}`, httpOptions)
    .pipe(
      catchError((err: any) => {
       console.log(err);
       return throwError('KABOOM');
     })
   );
  }

  create(todo: Todo) {
    if (!this.authService.checkLogin()) {
      this.router.navigateByUrl('home');
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Basic ${this.authService.getToken()}`
      })
    };

    return this.http.post(this.url, todo, httpOptions)
    .pipe(
        catchError((err: any) => {
         console.log(err);
         return throwError('KABOOM');
       })
     );
  }

  update(todo: Todo) {
    if (!this.authService.checkLogin()) {
      this.router.navigateByUrl('home');
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Basic ${this.authService.getToken()}`
      })
    };

    if (todo.completed) {
      todo.completeDate = this.datePipe.transform(Date.now(), 'shortDate');
    } else {
      todo.completeDate = '';
    }

    return this.http.put(`${this.url}/${todo.id}`, todo, httpOptions)
    .pipe(
        catchError((err: any) => {
         console.log(err);
         return throwError('KABOOM');
       })
     );
  }

  destroy(id: number) {
    if (!this.authService.checkLogin()) {
      this.router.navigateByUrl('home');
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${this.authService.getToken()}`
      })
    };

    return this.http.delete(`${this.url}/${id}`, httpOptions)
    .pipe(
        catchError((err: any) => {
         console.log(err);
         return throwError('KABOOM');
       })
     );
  }

  constructor(private http: HttpClient,
              private datePipe: DatePipe,
              private authService: AuthService,
              private router: Router) { }
}
