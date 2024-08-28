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
	
	createCategory(createAPI: CreateRecipeCategoryAPI): Observable<RecipeCategoryAPI> {
		return this.http.post<RecipeCategoryAPI>(this.recipeCategoriesUrl, createAPI);
	}

	getCategory(categoryId: string): Observable<RecipeCategoryAPI> {
		return this.http.get<RecipeCategoryAPI>(`${this.recipeCategoriesUrl}/${categoryId}`);
	}

	getCategories(): Observable<RecipeCategoryAPI[]> {
		return this.http.get<RecipeCategoryAPI[]>(this.recipeCategoriesUrl);
	}

	deleteCategory(categoryPid: string): Observable<number> {
		return this.http.delete<number>(`${this.recipeCategoriesUrl}/${categoryPid}`);
	}

}

export interface RecipeCategoryAPI {
	name: string;
	publicId: string;
}

export interface CreateRecipeCategoryAPI {
	name: string
}