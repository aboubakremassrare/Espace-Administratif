import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  serverUrl = environment.baseUrl;
  errorData: {};

  constructor(private http: HttpClient) { }

  createDemande(form) {
    return this.http.post<any>(this.serverUrl + 'api/demandes/attestation', form)
    .pipe(
      catchError(this.handleError)
    );
  }

  createDemandeAvance(form) {
    return this.http.post<any>(this.serverUrl + 'api/demandes/avance', form)
    .pipe(
      catchError(this.handleError)
    );
  }
  createDemandeAutorisation(form) {
    return this.http.post<any>(this.serverUrl + 'api/demandes/autorisation', form)
    .pipe(
      catchError(this.handleError)
    );
  }

  sendmail(form){
    return this.http.post<any>(this.serverUrl + 'api/demandes/sendmail', form)
    .pipe(
      catchError(this.handleError)
    );
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
