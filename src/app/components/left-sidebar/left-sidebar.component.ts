import { Component, OnInit, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { CreateRecipeCategoryAPI, RecipeCategoryAPI, RecipesCategoryService } from '../../recipe-category/recipe-category-service/recipe-category.service';
import { Subject, map, startWith, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { NewItemDialogComponent } from '../../shared/new-item-dialog/new-item-dialog.component';
import { NewRecipeCategoryDialogComponent } from '../../shared/new-item-dialogs/new-recipe-category-dialog/new-recipe-category-dialog.component';
import { DialogFields } from '../../shared/new-item-dialogs/new-recipe-category-dialog/new-recipe-category-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';

@Component({
	selector: 'app-left-sidebar',
	standalone: true,
	imports: [MatListModule, RouterModule, CommonModule],
	templateUrl: './left-sidebar.component.html',
	styleUrl: './left-sidebar.component.scss',
})
export class LeftSidebarComponent implements OnInit {
	readonly dialog = inject(MatDialog);
	readonly categoryService = inject(RecipesCategoryService);
	readonly snackbar = inject(SnackbarService);

	getItems$ = this.categoryService.getCategories().pipe(takeUntilDestroyed());
	refresh$ = new Subject<void>();

	navItems$ = this.refresh$.pipe(startWith(null), switchMap(() => this.getItems$.pipe(map(categories => this.toNavItems(categories)))));

	ngOnInit(): void {
		this.refresh$.next();
	}

	toNavItems(categories: RecipeCategoryAPI[]): NavItem[] {
		return categories.map(category => {
			return {
				route: category.publicId + '',
				displayName: category.name,
				isActive: false
			}
		});
	}

	addCategory(): void {
		this.dialog.open(NewItemDialogComponent, {
			data: { component: NewRecipeCategoryDialogComponent, itemType: 'recipe category' }
		}).afterClosed().subscribe((fields: DialogFields) => {
			if (fields) {
				const newCategory: CreateRecipeCategoryAPI = this.toRecipeCategory(fields);
				this.categoryService.createCategory(newCategory).subscribe((createAPI: CreateRecipeCategoryAPI) => {
					if (createAPI) {
						this.snackbar.displayMessage(`Category ${createAPI.name} created`);
						this.refresh$.next();
					}
					else {
						this.snackbar.displayErrorMessage('Error during creation of category');
					}
				});
			}

		});

	}

	removeCategory(categoryPid: string): void {
		this.categoryService.deleteCategory(categoryPid).subscribe((deletedCount: number) => {
			if (deletedCount > 0) {
				this.snackbar.displayMessage('Category successfully deleted');
				this.refresh$.next();
			}
			else {
				this.snackbar.displayErrorMessage('Error during deleting category');
			}
		});
	}

	toRecipeCategory(fields: DialogFields): CreateRecipeCategoryAPI {
		return {
			name: fields['name']
		};
	}

}

interface NavItem {
	route: string;
	displayName: string;
	isActive: boolean;
}
