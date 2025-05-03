import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCreateAPI } from 'src/app/shared/models/ProductCreateAPI';
import { PaginatedResponse } from 'src/app/shared/models/PaginatedResponse';
import { ProductAPI } from 'src/app/shared/models/ProductAPI';
import { Pagination } from 'src/app/shared/simple-table/simple-table.component';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    http = inject(HttpClient);
    apiBase = environment.baseUrl;
    productsUrl = `${this.apiBase}/products`;

    createProduct(createProductAPI: ProductCreateAPI): Observable<ProductAPI> {
        return this.http.post<ProductAPI>(this.productsUrl, createProductAPI);
    }

    getProducts(
        pagination: Pagination
    ): Observable<PaginatedResponse<ProductAPI>> {
        let paginationString = `${this.productsUrl}?pageNo=${pagination.pageNo}&pageSize=${pagination.pageSize}&sortBy=${pagination.sortBy}&sortDirection=${pagination.sortDirection}`;
        if (pagination.filter) {
            paginationString += `&filter=${pagination.filter}`;
        }
        return this.http.get<PaginatedResponse<ProductAPI>>(paginationString);
    }

    updateProduct(productAPI: ProductAPI): Observable<ProductAPI> {
        return this.http.put<ProductAPI>(
            `${this.productsUrl}/${productAPI.publicId}`,
            productAPI
        );
    }

    deleteProduct(publicId: string): Observable<boolean> {
        return this.http.delete<boolean>(`${this.productsUrl}/${publicId}`);
    }
}
