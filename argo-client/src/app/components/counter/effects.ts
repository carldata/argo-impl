import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { RESET_START, RESET, FAIL } from './reducer';

@Injectable()
export class CounterEffects {
  @Effect() login$: Observable<Action> = this.actions$.pipe(
    ofType(RESET_START),
    mergeMap(action =>
      this.http.get('assets/json/mock-empty-array.json').pipe(
        map(data => ({ type: RESET })),
        catchError(() => of({ type: FAIL }))
      )
    )
  );
  
  constructor(
    private http: HttpClient,
    private actions$: Actions
  ) {}
}