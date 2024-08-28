import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root'
})
export class SnackbarService {

	snackBar = inject(MatSnackBar);

	displayMessage(message: string): void {
		this.snackBar.open(message);
	}

	displayErrorMessage(error: string): void {
		this.displayMessage('Something went wrong ;( ' + error);
	}

}
