import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()

export class AuthService {

  serverUrl = environment.baseUrl;
  errorData: {};

  constructor(private http: HttpClient) { }

  redirectUrl: string;

  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  getAuthorizationToken() {
    const currentUser = localStorage.getItem('token');
    return currentUser;
  }

 
  login(username, password) {
    return this.http.post<any>(`${this.serverUrl}api/user/login`, {username: username, password: password})
    .pipe(map(user => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('token', user.data.token);
          localStorage.setItem('user_id', user.data.user_id);
        }
      }),
     
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
    
      console.error('An error occurred:', error.error.message);
    } else {
     
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
  
    this.errorData = {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }


}