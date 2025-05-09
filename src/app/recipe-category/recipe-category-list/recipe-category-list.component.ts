import { Component, inject } from '@angular/core';
import { DrawerWithTableComponent } from '../../shared/drawer-with-table/drawer-with-table.component';
import {
    RecipeCategoryAPI,
    RecipesCategoryService,
} from 'src/app/recipe-category/recipe-category-service/recipe-category.service';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { DialogFields } from 'src/app/shared/new-item-dialogs/new-recipe-category-dialog/new-recipe-category-dialog.component';
import { CommonModule, NgIf } from '@angular/common';

@Component({
    selector: 'app-recipe-category-list',
    standalone: true,
    imports: [DrawerWithTableComponent, NgIf, CommonModule],
    templateUrl: './recipe-category-list.component.html',
    styleUrl: './recipe-category-list.component.scss',
})
export class RecipeCategoryListComponent {
    private categoriesService = inject(RecipesCategoryService);
    private snackbarService = inject(SnackbarService);

    refreshSubject$: BehaviorSubject<void> = new BehaviorSubject<void>(
        undefined
    );

    categories$: Observable<RecipeCategoryAPI[]> = this.refreshSubject$.pipe(
        switchMap(() => this.categoriesService.getCategories())
    );

    addCategory(fields: DialogFields): void {
        this.categoriesService
            .createCategory({ name: fields['name'] as string })
            .subscribe((newCategory: RecipeCategoryAPI | null) => {
                if (newCategory) {
                    this.snackbarService.displayMessage(
                        `Category: ${newCategory.name} successfully created`
                    );
                    this.refreshSubject$.next();
                }
            });
    }

    deleteCategory(publicId: string): void {
        this.categoriesService
            .deleteCategory(publicId)
            .subscribe((success: boolean) => {
                if (success) {
                    this.snackbarService.displayMessage(
                        success ? 'sukces' : 'chujnia'
                    );
                    this.refreshSubject$.next();
                }
            });
    }

    updateCategory(fields: DialogFields): void {
        this.categoriesService
            .updateCategory(this.toRecipeCategoryAPI(fields))
            .subscribe((updatedCategoryAPI: RecipeCategoryAPI | null) => {
                if (updatedCategoryAPI) {
                    this.snackbarService.displayMessage(
                        `Category: ${updatedCategoryAPI.name} successfully updated`
                    );
                    this.refreshSubject$.next();
                }
            });
    }

    private toRecipeCategoryAPI(fields: DialogFields): RecipeCategoryAPI {
        return {
            publicId: fields['publicId'] as string,
            name: fields['name'] as string,
        };
    }
}
