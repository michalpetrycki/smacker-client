import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RecipesCategoryService {
    http = inject(HttpClient);
    apiBase = environment.baseUrl;
    recipeCategoriesUrl = `${this.apiBase}/recipe-categories`;

    createCategory(
        createCategoryAPI: CreateRecipeCategoryAPI
    ): Observable<RecipeCategoryAPI> {
        return this.http.post<RecipeCategoryAPI>(
            this.recipeCategoriesUrl,
            createCategoryAPI
        );
    }

    getCategory(categoryId: string): Observable<RecipeCategoryAPI> {
        return this.http.get<RecipeCategoryAPI>(
            `${this.recipeCategoriesUrl}/${categoryId}`
        );
    }

    getCategories(): Observable<RecipeCategoryAPI[]> {
        return this.http.get<RecipeCategoryAPI[]>(this.recipeCategoriesUrl);
    }

    updateCategory(
        updateCategoryAPI: RecipeCategoryAPI
    ): Observable<RecipeCategoryAPI> {
        return this.http.put<RecipeCategoryAPI>(
            `${this.recipeCategoriesUrl}/${updateCategoryAPI.publicId}`,
            updateCategoryAPI
        );
    }

    deleteCategory(categoryPid: string): Observable<boolean> {
        return this.http.delete<boolean>(
            `${this.recipeCategoriesUrl}/${categoryPid}`
        );
    }
}

export interface RecipeCategoryAPI {
    name: string;
    publicId: string;
}

export interface CreateRecipeCategoryAPI {
    name: string;
}
