import { CommonModule, NgIf } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, switchMap } from 'rxjs';
import { ProductService } from 'src/app/product/product-service/product/product.service';
import { DrawerWithTableComponent } from 'src/app/shared/drawer-with-table/drawer-with-table.component';
import { PaginatedResponse } from 'src/app/shared/models/PaginatedResponse';
import { ProductAPI } from 'src/app/shared/models/ProductAPI';
import { DialogFields } from 'src/app/shared/new-item-dialogs/new-recipe-category-dialog/new-recipe-category-dialog.component';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { Pagination } from 'src/app/shared/simple-table/simple-table.component';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [NgIf, CommonModule, DrawerWithTableComponent],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
    displayNameProperty = 'productName';
    private productService = inject(ProductService);
    private snackbarService = inject(SnackbarService);
    private pagination$: BehaviorSubject<Pagination> =
        new BehaviorSubject<Pagination>({
            pageNo: 0,
            pageSize: 5,
            sortDirection: 'asc',
            sortBy: 'productName',
        });

    refresh$: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);

    paginatedResponse$: Observable<PaginatedResponse<ProductAPI>> =
        combineLatest([this.refresh$, this.pagination$]).pipe(
            switchMap(([_, pagination]) =>
                this.productService.getProducts(pagination)
            )
        );

    requestNextPage(pagination: Pagination): void {
        this.pagination$.next(pagination);
        this.refresh$.next();
    }

    addProduct(fields: DialogFields): void {
        this.productService
            .createProduct({
                name: fields['name'],
                description: fields['description'],
                carbs: Number(fields['carbs']),
                fiber: Number(fields['fiber']),
                fats: Number(fields['fats']),
                proteins: Number(fields['proteins']),
                categories: [],
            })
            .subscribe((newProduct: ProductAPI | null) => {
                if (newProduct) {
                    this.snackbarService.displayMessage(
                        `Product: ${newProduct.name} successfully created`
                    );
                    this.refresh$.next();
                }
            });
    }

    deleteProduct(publicId: string): void {
        this.productService
            .deleteProduct(publicId)
            .subscribe((success: boolean) => {
                if (success) {
                    this.snackbarService.displayMessage(
                        success ? 'sukces' : 'chujnia'
                    );
                    this.refresh$.next();
                }
            });
    }

    updateProduct(fields: DialogFields): void {
        this.productService
            .updateProduct(this.toProductAPI(fields))
            .subscribe((updatedProductAPI: ProductAPI | null) => {
                if (updatedProductAPI) {
                    this.snackbarService.displayMessage(
                        `Product: ${updatedProductAPI.name} successfully updated`
                    );
                    this.refresh$.next();
                }
            });
    }

    private toProductAPI(fields: DialogFields): ProductAPI {
        return {
            publicId: fields['publicId'],
            lastUpdate: new Date(fields['lastUpdate']),
            name: fields['name'],
            description: fields['description'],
            carbs: Number(fields['description']),
            fiber: Number(fields['description']),
            fats: Number(fields['description']),
            proteins: Number(fields['description']),
            categories: [],
        };
    }
}
