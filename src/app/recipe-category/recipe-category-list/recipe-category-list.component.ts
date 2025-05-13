import { Component, inject } from '@angular/core';
import { DrawerWithTableComponent } from '../../shared/drawer-with-table/drawer-with-table.component';
import { RecipeCategoryService } from 'src/app/recipe-category/recipe-category-service/recipe-category.service';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import {
    BehaviorSubject,
    catchError,
    combineLatest,
    Observable,
    switchMap,
} from 'rxjs';
import { DialogFields } from 'src/app/shared/new-item-dialogs/new-recipe-category-dialog/new-recipe-category-dialog.component';
import { CommonModule, NgIf } from '@angular/common';
import { FormType } from 'src/app/shared/drawer-entity-builder/drawer-entity-builder.component';
import { Pagination } from 'src/app/shared/simple-table/simple-table.component';
import { PaginatedResponse } from 'src/app/shared/models/PaginatedResponse';
import { RecipeCategoryCreateAPI } from 'src/app/shared/models/RecipeCategoryCreateAPI';
import { RecipeCategoryAPI } from 'src/app/shared/models/RecipeCategoryAPI';

@Component({
    selector: 'app-recipe-category-list',
    standalone: true,
    imports: [DrawerWithTableComponent, NgIf, CommonModule],
    templateUrl: './recipe-category-list.component.html',
    styleUrl: './recipe-category-list.component.scss',
})
export class RecipeCategoryListComponent {
    displayNameProperty = 'categoryName';
    formType: FormType = 'recipeCategory';
    private recipeCategoryService = inject(RecipeCategoryService);
    private snackbarService = inject(SnackbarService);
    private pagination$: BehaviorSubject<Pagination> =
        new BehaviorSubject<Pagination>({
            pageNo: 0,
            pageSize: 5,
            sortDirection: 'asc',
            sortBy: 'categoryName',
        });

    refresh$: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);

    paginatedResponse$: Observable<PaginatedResponse<RecipeCategoryAPI>> =
        combineLatest([this.refresh$, this.pagination$]).pipe(
            switchMap(([_, pagination]) =>
                this.recipeCategoryService.getRecipeCategories(pagination)
            )
        );

    requestNextPage(pagination: Pagination): void {
        this.pagination$.next(pagination);
        this.refresh$.next();
    }

    addRecipeCategory(fields: DialogFields): void {
        const product: RecipeCategoryCreateAPI = {
            name: fields['name'] as string,
        };

        this.recipeCategoryService
            .createRecipeCategory(product)
            .pipe(
                catchError((err) => {
                    console.log(err);
                    throw err;
                })
            )
            .subscribe((newCategory: RecipeCategoryCreateAPI | null) => {
                if (newCategory) {
                    this.snackbarService.displayMessage(
                        `Recipe category: ${newCategory.name} successfully created`
                    );
                    this.refresh$.next();
                }
            });
    }

    deleteRecipeCategory(publicId: string): void {
        this.recipeCategoryService
            .deleteRecipeCategory(publicId)
            .subscribe((success: boolean) => {
                if (success) {
                    this.snackbarService.displayMessage(
                        success ? 'sukces' : 'chujnia'
                    );
                    this.refresh$.next();
                }
            });
    }

    updateRecipeCategory(fields: DialogFields): void {
        this.recipeCategoryService
            .updateRecipeCategory(this.toRecipeCategoryAPI(fields))
            .subscribe((updatedRecipeCategoryAPI: RecipeCategoryAPI | null) => {
                if (updatedRecipeCategoryAPI) {
                    this.snackbarService.displayMessage(
                        `Recipe category: ${updatedRecipeCategoryAPI.name} successfully updated`
                    );
                    this.refresh$.next();
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
