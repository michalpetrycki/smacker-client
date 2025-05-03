import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateProductCategoryAPI } from 'src/app/shared/models/CreateProductCategoryAPI';
import { PaginatedResponse } from 'src/app/shared/models/PaginatedResponse';
import { ProductCategoryAPI } from 'src/app/shared/models/ProductCategoryAPI';
import { Pagination } from 'src/app/shared/simple-table/simple-table.component';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class ProductCategoryService {
    http = inject(HttpClient);
    apiBase = environment.baseUrl;
    productCategoriesUrl = `${this.apiBase}/product-categories`;

    createProductCategory(
        createProductCategoryAPI: CreateProductCategoryAPI
    ): Observable<ProductCategoryAPI> {
        return this.http.post<ProductCategoryAPI>(
            this.productCategoriesUrl,
            createProductCategoryAPI
        );
    }

    getProductCategories(
        pagination: Pagination
    ): Observable<PaginatedResponse<ProductCategoryAPI>> {
        let paginationString = `${this.productCategoriesUrl}?pageNo=${pagination.pageNo}&pageSize=${pagination.pageSize}&sortBy=${pagination.sortBy}&sortDirection=${pagination.sortDirection}`;
        if (pagination.filter) {
            paginationString += `&filter=${pagination.filter}`;
        }
        return this.http.get<PaginatedResponse<ProductCategoryAPI>>(
            paginationString
        );
    }

    updateProductCategory(
        productCategoryAPI: ProductCategoryAPI
    ): Observable<ProductCategoryAPI> {
        return this.http.put<ProductCategoryAPI>(
            `${this.productCategoriesUrl}/${productCategoryAPI.publicId}`,
            productCategoryAPI
        );
    }

    deleteProductCategory(publicId: string): Observable<boolean> {
        return this.http.delete<boolean>(
            `${this.productCategoriesUrl}/${publicId}`
        );
    }
}
