import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private serviceUrl = 'api/login';  // URL to web api


  constructor(
    public messageServie:MessageService,
    private http: HttpClient,
    private messageService: MessageService) { }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.show(`LoginService: ${message}`);
  }


  loginUser(user:User):Observable<boolean>{
    let status:boolean = user.password == 'test1234'
    this.messageServie.show(`Login status: ${status}`) 
    return this.http.post<boolean>(this.serviceUrl, user).pipe(
      tap(_ => this.log('authorized user')),
      catchError(this.handleError('loginUser', false))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
 
  
    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);
 
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
