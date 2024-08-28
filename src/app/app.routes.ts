import { Routes } from '@angular/router';

export const routes: Routes = [
    {

        path: 'recipes', children: [
            { path: ':recipeId', loadComponent: () => import('./recipes/recipes-list/recipes-list.component').then(c => c.RecipesListComponent) },
            { path: 'category/:categoryId', loadComponent: () => import('./recipes/recipes-list/recipes-list.component').then(c => c.RecipesListComponent) }
        ],
    }, {
        path: 'category', children: [
            { path: '', loadComponent: () => import('./recipe-category/recipe-category-list/recipe-category-list.component').then(c => c.RecipeCategoryListComponent) },
            {
                path: ':categoryId', children: [
                    { path: '', loadComponent: () => import('./recipe-category/recipe-category-detail/recipe-category-detail.component').then(c => c.RecipeCategoryDetailComponent) },
                    { path: 'recipes', loadComponent: () => import('./recipes/recipes-list/recipes-list.component').then(c => c.RecipesListComponent) }
                ]
            },

        ],
    }
];
