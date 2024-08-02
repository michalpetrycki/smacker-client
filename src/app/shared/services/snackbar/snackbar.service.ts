import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root'
})
export class SnackbarService {

	snackBar = inject(MatSnackBar);

	dispalySuccessMessage(message: string): void {
		this.snackBar.open(message);
	}

	displayErrorMessage(error: string): void {
		this.snackBar.open('Something went wrong ;( ' + error);
	}

}
