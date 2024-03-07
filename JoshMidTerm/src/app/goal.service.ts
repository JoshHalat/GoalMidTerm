import { Goal } from './goal';
//import { Goals } from './mock-goals';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
 
export class GoalService {
 
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
 
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
 
     private log(message: string) {
      this.messageService.add(`goalService: ${message}`);
    }
 
    private goalsUrl = 'api/goals';  // URL to web api
 
    /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
 
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
 
    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);
 
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
 
 /** GET heroes from the server */
getGoals(): Observable<Goal[]> {
  return this.http.get<Goal[]>(this.goalsUrl)
    .pipe(
      tap(_ => this.log('fetched goals')),
      catchError(this.handleError<Goal[]>('getGoals', []))
    );
}
 
  /** GET hero by id. Will 404 if id not found */
getGoal(id: number): Observable<Goal> {
  const url = `${this.goalsUrl}/${id}`;
  return this.http.get<Goal>(url).pipe(
    tap(_ => this.log(`fetched goal id=${id}`)),
    catchError(this.handleError<Goal>(`getGoal id=${id}`))
  );
}
/** POST: add a new hero to the server */
addGoal(goal: Goal): Observable<Goal> {
  return this.http.post<Goal>(this.goalsUrl, goal, this.httpOptions).pipe(
    tap((newHero: Goal) => this.log(`added goal w/ id=${newHero.id}`)),
    catchError(this.handleError<Goal>('addGoal'))
  );
}
 
/** DELETE: delete the hero from the server */
deleteGoal(id: number): Observable<Goal> {
  const url = `${this.goalsUrl}/${id}`;
 
  return this.http.delete<Goal>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Goal>('deleteGoal'))
  );
}
 
/** PUT: update the hero on the server */
updateGoal(hero: Goal): Observable<any> {
  return this.http.put(this.goalsUrl, hero, this.httpOptions).pipe(
    tap(_ => this.log(`updated goal id=${hero.id}`)),
    catchError(this.handleError<any>('updateGoal'))
  );
}
 
/* GET heroes whose name contains search term */
searchGoals(term: string): Observable<Goal[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Goal[]>(`${this.goalsUrl}/?name=${term}`).pipe(
    tap(x => x.length ?
       this.log(`found goals matching "${term}"`) :
       this.log(`no goals matching "${term}"`)),
    catchError(this.handleError<Goal[]>('searchGoals', []))
  );
}
 
}