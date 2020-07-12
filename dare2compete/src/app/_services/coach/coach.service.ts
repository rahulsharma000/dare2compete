import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  //public apiServer = "http://localhost/api/";
  public apiServer ="https://vedprakashthawait.com/api/";
    errorData: {};
  redirectUrl: string;
  constructor(
    private http: HttpClient,
  ) { }


  getAll()
  {
    return this.http.post<any>(`${this.apiServer}dare2complete/list`,{}).pipe(map(data => 
      {
        return  JSON.stringify(data);
      }),
      
    ); 
  }


  getBooked(record:any)
  {
    return this.http.post<any>(`${this.apiServer}dare2complete/add`,record).pipe(map(data => 
      {
        return  JSON.stringify(data);
      }),
      
    ); 
  }

  getCountData()
  {

    return this.http.post<any>(`${this.apiServer}dare2complete/listcount`,{}).pipe(map(data => 
      {
        return  JSON.stringify(data);
      }),
      
    ); 
    
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message
    this.errorData = 
    {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }

  

}
