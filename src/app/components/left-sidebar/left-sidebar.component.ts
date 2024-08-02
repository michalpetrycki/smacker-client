import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { CreateRecipeCategoryAPI, RecipeCategoryAPI, RecipesCategoryService } from '../../recipe-category/recipe-category-service/recipe-category.service';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { NewItemDialogComponent } from '../../shared/new-item-dialog/new-item-dialog.component';
import { NewRecipeCategoryDialogComponent } from '../../shared/new-item-dialogs/new-recipe-category-dialog/new-recipe-category-dialog.component';
import { DialogFields } from '../../shared/new-item-dialogs/new-recipe-category-dialog/new-recipe-category-dialog.component';

@Component({
	selector: 'app-left-sidebar',
	standalone: true,
	imports: [MatListModule, RouterModule, CommonModule],
	templateUrl: './left-sidebar.component.html',
	styleUrl: './left-sidebar.component.scss',
})
export class LeftSidebarComponent {
	readonly dialog = inject(MatDialog);
	readonly categoryService = inject(RecipesCategoryService);

	getItems$ = new BehaviorSubject(true);

	navItems$: Observable<NavItem[]> = this.getItems$.pipe(
		switchMap(() => this.categoryService.getCategories().pipe(
			map((item: RecipeCategoryAPI[]) => this.toNavItems(item))
		))
	);

	toNavItems(categories: RecipeCategoryAPI[]): NavItem[] {
		return categories.map(category => {
			return {
				route: category.id + '',
				displayName: category.name,
				isActive: false
			}
		});
	}

	addCategory(): void {
		this.dialog.open(NewItemDialogComponent, {
			data: { component: NewRecipeCategoryDialogComponent }
		}).afterClosed().subscribe((fields: DialogFields) => {

			if (fields) {
				const newCategory: CreateRecipeCategoryAPI = this.toRecipeCategory(fields);
				this.categoryService.createRecipeCategory(newCategory).subscribe(() => {
					this.getItems$.next(true);
				});
			}

		});

	}

	removeCategory(a: any): void {
		this.categoryService.deleteCategory(Number(a.route)).subscribe(() => {
			this.getItems$.next(true);
		});
	}

	toRecipeCategory(fields: DialogFields): CreateRecipeCategoryAPI {
		return {
			name: fields['newCategoryName']
		};
	}

}

interface NavItem {
	route: string;
	displayName: string;
	isActive: boolean;
}
