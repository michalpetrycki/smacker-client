import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { CreateRecipeCategoryAPI, RecipesCategoryService } from 'src/app/recipe-category/recipe-category-service/recipe-category.service';
import { NewItemDialogComponent } from 'src/app/shared/new-item-dialog/new-item-dialog.component';
import { InputControl } from 'src/app/shared/new-item-dialogs/new-recipe-dialog/new-recipe-dialog.component';

@Component({
	selector: 'app-new-recipe-category-dialog',
	standalone: true,
	imports: [MatFormField, MatInput, MatLabel, CommonModule, FormsModule, MatButtonModule, MatStepperModule, MatIconModule, ReactiveFormsModule],
	templateUrl: './new-recipe-category-dialog.component.html',
	styleUrl: './new-recipe-category-dialog.component.scss'
})
export class NewRecipeCategoryDialogComponent implements OnInit {

	categoryService = inject(RecipesCategoryService);
	fields: DialogFields = {};
	public dialogRef = inject(MatDialogRef<NewRecipeCategoryDialogComponent>);
	destroyRef = inject(DestroyRef);

	categoryFormGroup: FormGroup = new FormGroup({});
	controls: InputControl[] = [
		{ name: 'name', required: true },
	];

	ngOnInit(): void {
		const newControl = new FormControl('', { validators: this.controls[0].required ? Validators.required : null });
		this.categoryFormGroup.addControl(this.controls[0].name, newControl);
	}

	addItem(): void {
		const newRecipe: CreateRecipeCategoryAPI = { name: this.categoryFormGroup.get(this.controls[0].name)?.getRawValue() };
		this.fields['name'] = newRecipe.name;
		this.dialogRef.close(this.fields);
		// this.categoryService.createCategory(newRecipe).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
		// 	alert('new category created');
		// 	this.dialogRef.close();
		// });
	}

}

export interface DialogFields {
	[key: string]: string
}