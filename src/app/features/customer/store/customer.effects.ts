import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { CustomerActions } from '../actions/customer.actions';


@Injectable()
export class CustomerEffects {

  loadCustomers$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CustomerActions.loadCustomers),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => CustomerActions.loadCustomersSuccess({ data })),
          catchError(error => of(CustomerActions.loadCustomersFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
