import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'recipes', children: [
            { path: ':recipeId', loadComponent: () => import('./recipes/recipes-list/recipes-list.component').then(m => m.RecipesListComponent) },
            { path: 'category/:categoryId', loadComponent: () => import('./recipes/recipes-list/recipes-list.component').then(m => m.RecipesListComponent) }
        ],
    }]
    ;
