import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, switchMap } from 'rxjs';
import { ProductCategoryService } from 'src/app/product-category/product-category-service/product-category.service';
import { DrawerWithTableComponent } from 'src/app/shared/drawer-with-table/drawer-with-table.component';
import { PaginatedResponse } from 'src/app/shared/models/PaginatedResponse';
import { ProductCategoryAPI } from 'src/app/shared/models/ProductCategoryAPI';
import { DialogFields } from 'src/app/shared/new-item-dialogs/new-recipe-category-dialog/new-recipe-category-dialog.component';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { Pagination } from 'src/app/shared/simple-table/simple-table.component';

@Component({
    selector: 'app-product-category-list',
    standalone: true,
    imports: [NgIf, CommonModule, DrawerWithTableComponent],
    templateUrl: './product-category-list.component.html',
    styleUrl: './product-category-list.component.scss',
})
export class ProductCategoryListComponent {
    displayNameProperty = 'categoryName';
    private productCategoryService = inject(ProductCategoryService);
    private snackbarService = inject(SnackbarService);
    private pagination$: BehaviorSubject<Pagination> =
        new BehaviorSubject<Pagination>({
            pageNo: 0,
            pageSize: 5,
            sortDirection: 'asc',
            sortBy: 'categoryName',
        });

    refresh$: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);

    paginatedResponse$: Observable<PaginatedResponse<ProductCategoryAPI>> =
        combineLatest([this.refresh$, this.pagination$]).pipe(
            switchMap(([_, pagination]) =>
                this.productCategoryService.getProductCategories(pagination)
            )
        );

    requestNextPage(pagination: Pagination): void {
        this.pagination$.next(pagination);
        this.refresh$.next();
    }

    addProductCategory(fields: DialogFields): void {
        this.productCategoryService
            .createProductCategory({ name: fields['name'] as string })
            .subscribe((newProductCategory: ProductCategoryAPI | null) => {
                if (newProductCategory) {
                    this.snackbarService.displayMessage(
                        `Product Category: ${newProductCategory.name} successfully created`
                    );
                    this.refresh$.next();
                }
            });
    }

    deleteProductCategory(publicId: string): void {
        this.productCategoryService
            .deleteProductCategory(publicId)
            .subscribe((success: boolean) => {
                if (success) {
                    this.snackbarService.displayMessage(
                        success ? 'sukces' : 'chujnia'
                    );
                    this.refresh$.next();
                }
            });
    }

    updateProductCategory(fields: DialogFields): void {
        this.productCategoryService
            .updateProductCategory(this.toProductCategoryAPI(fields))
            .subscribe(
                (updatedProductCategoryAPI: ProductCategoryAPI | null) => {
                    if (updatedProductCategoryAPI) {
                        this.snackbarService.displayMessage(
                            `Product Category: ${updatedProductCategoryAPI.name} successfully updated`
                        );
                        this.refresh$.next();
                    }
                }
            );
    }

    private toProductCategoryAPI(fields: DialogFields): ProductCategoryAPI {
        return {
            publicId: fields['publicId'] as string,
            name: fields['name'] as string,
        };
    }
}
