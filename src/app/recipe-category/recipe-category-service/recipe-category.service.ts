import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class RecipesCategoryService {

	http = inject(HttpClient);
	apiBase = environment.baseUrl;
	recipeCategoriesUrl = `${this.apiBase}/recipe-categories`;

	createRecipeCategory(createAPI: CreateRecipeCategoryAPI): Observable<RecipeCategoryAPI> {
		return this.http.post<RecipeCategoryAPI>(this.recipeCategoriesUrl, createAPI);
	}

	getCategories(): Observable<RecipeCategoryAPI[]> {
		return this.http.get<RecipeCategoryAPI[]>(this.recipeCategoriesUrl);
	}

	deleteCategory(categoryId: number): Observable<boolean> {
		return this.http.delete<boolean>(`${this.recipeCategoriesUrl}/${categoryId}`);
	}

}

export interface RecipeCategoryAPI {
	id: number;
	name: string;
}

export interface CreateRecipeCategoryAPI {
	name: string
}