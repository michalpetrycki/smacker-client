import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandlerFn,
    HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';

export function errorInterceptor(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
    const snackbar = inject(SnackbarService);
    return next(req).pipe(
        catchError((error: HttpErrorResponse | Error) => {
            if (error instanceof HttpErrorResponse) {
                console.error('Server side error: ' + error);
            } else {
                console.error('Not a httpErrorResponse: ' + error);
            }
            snackbar.displayErrorMessage(
                (error as any).message ?? (error as any).error?.message
            );
            return throwError(() => error);
        })
    );
}
