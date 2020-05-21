import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Departement } from './Departement.model';
import { Interime } from './Interime.model';

@Injectable({
  providedIn: 'root'
})
export class CongeService {

  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getDepartements(token:string) {
    return this.http.post<Departement>(this.serverUrl + 'api/departement/departements',{token}).pipe(
      catchError(this.handleError)
    );
  }
  
  getInterimes(token:string) {
    return this.http.post<Interime>(this.serverUrl + 'api/interime/interimes',{token}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      console.error('An error occurred:', error.error.message);
    } else {

      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
   
    return throwError('Something bad happened. Please try again later.');
  }

}
