import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/shared/simple-table/simple-table.component';
import { PaginatedResponse } from 'src/app/shared/models/PaginatedResponse';
import { RecipeCategoryCreateAPI } from 'src/app/shared/models/RecipeCategoryCreateAPI';
import { RecipeCategoryAPI } from 'src/app/shared/models/RecipeCategoryAPI';

@Injectable({
    providedIn: 'root',
})
export class RecipeCategoryService {
    http = inject(HttpClient);
    apiBase = environment.baseUrl;
    recipeCategoriesUrl = `${this.apiBase}/recipe-categories`;

    createRecipeCategory(
        createRecipeCategoryAPI: RecipeCategoryCreateAPI
    ): Observable<RecipeCategoryAPI> {
        return this.http.post<RecipeCategoryAPI>(
            this.recipeCategoriesUrl,
            createRecipeCategoryAPI
        );
    }

    getRecipeCategories(
        pagination: Pagination
    ): Observable<PaginatedResponse<RecipeCategoryAPI>> {
        let paginationString = `${this.recipeCategoriesUrl}?pageNo=${pagination.pageNo}&pageSize=${pagination.pageSize}&sortBy=${pagination.sortBy}&sortDirection=${pagination.sortDirection}`;
        if (pagination.filter) {
            paginationString += `&filter=${pagination.filter}`;
        }
        return this.http.get<PaginatedResponse<RecipeCategoryAPI>>(
            paginationString
        );
    }

    updateRecipeCategory(
        recipeCategoryAPI: RecipeCategoryAPI
    ): Observable<RecipeCategoryAPI> {
        return this.http.put<RecipeCategoryAPI>(
            `${this.recipeCategoriesUrl}/${recipeCategoryAPI.publicId}`,
            recipeCategoryAPI
        );
    }

    deleteRecipeCategory(publicId: string): Observable<boolean> {
        return this.http.delete<boolean>(
            `${this.recipeCategoriesUrl}/${publicId}`
        );
    }
}
