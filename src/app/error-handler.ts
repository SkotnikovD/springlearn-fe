import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param result - optional value to return as the observable result
 */
export function handleError<T> (result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
        handle(error);
        console.error(error); 
        // Let the app keep running by returning an empty result.
        return of(result as T);
    };
}

export function handleErrorAndRethrow() {
    return (error: HttpErrorResponse): Observable<any> => {
        handle(error);
        return throwError(error);
    };
}

function handle (error){
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
    // client-side error
    errorMessage = error.message;
    } else {
    // server-side error
    errorMessage = error.error.clientMessage;
    }

    alert(`Error: ${errorMessage}`);
}