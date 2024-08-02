import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Recipe, RecipesService } from '../recipes-service/recipes.service';
import { RecipesCategoryService } from '../../recipe-category/recipe-category-service/recipe-category.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { NewItemDialogComponent } from '../../shared/new-item-dialog/new-item-dialog.component';
import { NewRecipeDialogComponent } from '../../shared/new-item-dialogs/new-recipe-dialog/new-recipe-dialog.component';

@Component({
	selector: 'app-recipes-list',
	standalone: true,
	imports: [CommonModule, MatButtonModule, MatIconModule, NewItemDialogComponent, NewRecipeDialogComponent],
	templateUrl: './recipes-list.component.html',
	styleUrl: './recipes-list.component.scss'
})
export class RecipesListComponent {
	readonly dialog = inject(MatDialog);
	readonly recipeService = inject(RecipesService);
	readonly categoryService = inject(RecipesCategoryService);

	recipeId = input<string>();
	categoryId = input<string>();

	recipes$: Observable<Recipe[]>;

	constructor() {
		this.recipes$ = this.recipeService.getRecipes().pipe(
			tap(recipes => console.log(recipes.length)),
			catchError(error => { debugger; throw 'error' + error })
		);
	}

	addNewRecipe(): void {
		this.dialog.open(NewItemDialogComponent, {
			data: { component: NewRecipeDialogComponent }
		}).afterClosed().subscribe((result) => {
			// debugger;
		});
	}

}

