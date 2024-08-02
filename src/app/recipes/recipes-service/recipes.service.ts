import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment.development';

@Injectable({
	providedIn: 'root'
})
export class RecipesService {

	http = inject(HttpClient);
	apiBase = environment.baseUrl;

	// getRecipeById(recipeId: number): Recipe | undefined {
	// 	return this._recipes.find(recipe => recipe.id === recipeId);
	// }

	// getRecipesByCategoryId(categoryId: number): Recipe[] {
	// 	return this._recipes.filter(recipe => recipe.categoryId === categoryId);
	// }




	getRecipes(): Observable<Recipe[]> {
		return this.http.get<Recipe[]>(`${this.apiBase}/recipes`);
	}

	getRecipe(recipeId: number): Observable<Recipe> {
		return this.http.get<Recipe>(`${this.apiBase}/recipes/${recipeId}`);
	}

	// createRecipe(recipeAPI: RecipeAPI): Observable<Recipe> {
	// 	return this.http.post<Recipe>(`${this.apiBase}/recipes`, recipeAPI);
	// }

	// updateRecipe(recipeId: number, recipeAPI: RecipeAPI): Observable<Recipe> {
	// 	return this.http.put<Recipe>(`${this.apiBase}/recipes/${recipeId}`, recipeAPI);
	// }

	// deleteRecipe(recipeId: number): Observable<Recipe> {
	// 	return this.http.delete<Recipe>(`${this.apiBase}/recipes/${recipeId}`);
	// }

}

export interface Recipe {
	id: number;
	name: string;
	description: string;
}