import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
	selector: 'app-new-recipe-category-dialog',
	standalone: true,
	imports: [MatFormField, MatInput, MatLabel, CommonModule, FormsModule],
	templateUrl: './new-recipe-category-dialog.component.html',
	styleUrl: './new-recipe-category-dialog.component.scss'
})
export class NewRecipeCategoryDialogComponent {

	public dialogTitle = 'Add Recipe Category';
	public fields: DialogFields = {
		newCategoryName: ''
	}

}

export interface DialogFields {
	[key: string]: string
}