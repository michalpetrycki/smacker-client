import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class SnackbarService {
    snackBar = inject(MatSnackBar);

    displayMessage(message: string): void {
        this.snackBar.open(message, 'OK', { duration: 30000 });
    }

    displayErrorMessage(error: string): void {
        this.displayMessage('Something went wrong ;( \n' + error);
    }
}
