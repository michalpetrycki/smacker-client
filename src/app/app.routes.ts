import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'recipes',
        children: [
            {
                path: '',
                loadComponent: () =>
                    import(
                        './recipes/recipes-list/recipes-list.component'
                    ).then((c) => c.RecipesListComponent),
            },
            {
                path: ':recipeId',
                loadComponent: () =>
                    import(
                        './recipes/recipes-list/recipes-list.component'
                    ).then((c) => c.RecipesListComponent),
            },
            {
                path: 'category/:categoryId',
                loadComponent: () =>
                    import(
                        './recipes/recipes-list/recipes-list.component'
                    ).then((c) => c.RecipesListComponent),
            },
        ],
    },
    {
        path: 'category',
        children: [
            {
                path: '',
                loadComponent: () =>
                    import(
                        './recipe-category/recipe-category-list/recipe-category-list.component'
                    ).then((c) => c.RecipeCategoryListComponent),
            },
            {
                path: ':categoryId',
                children: [
                    {
                        path: '',
                        loadComponent: () =>
                            import(
                                './recipe-category/recipe-category-detail/recipe-category-detail.component'
                            ).then((c) => c.RecipeCategoryDetailComponent),
                    },
                    {
                        path: 'recipes',
                        loadComponent: () =>
                            import(
                                './recipes/recipes-list/recipes-list.component'
                            ).then((c) => c.RecipesListComponent),
                    },
                ],
            },
        ],
    },
    {
        path: 'tools',
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./tool/tool-list/tool-list.component').then(
                        (c) => c.ToolListComponent
                    ),
            },
        ],
    },
    {
        path: 'products',
        children: [
            {
                path: '',
                loadComponent: () =>
                    import(
                        './product/product-list/product-list.component'
                    ).then((c) => c.ProductListComponent),
            },
        ],
    },
    {
        path: 'product-categories',
        children: [
            {
                path: '',
                loadComponent: () =>
                    import(
                        './product-category/product-category-list/product-category-list.component'
                    ).then((c) => c.ProductCategoryListComponent),
            },
        ],
    },
    {
        path: 'recipe-categories',
        children: [
            {
                path: '',
                loadComponent: () =>
                    import(
                        './recipe-category/recipe-category-list/recipe-category-list.component'
                    ).then((c) => c.RecipeCategoryListComponent),
            },
        ],
    },
];
