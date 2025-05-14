import { CommonModule } from '@angular/common';
import { Component, DestroyRef, effect, inject, input } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RecipeAPI, RecipesService } from '../recipes-service/recipes.service';
import { RecipeCategoryService } from '../../recipe-category/recipe-category-service/recipe-category.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { NewItemDialogComponent } from 'src/app/shared/new-item-dialog/new-item-dialog.component';
import { NewRecipeDialogComponent } from 'src/app/shared/new-item-dialogs/new-recipe-dialog/new-recipe-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { RouterModule } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';

@Component({
    selector: 'app-recipes-list',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        NewItemDialogComponent,
        NewRecipeDialogComponent,
        InfiniteScrollDirective,
        RouterModule,
        MatSidenavModule,
    ],
    templateUrl: './recipes-list.component.html',
    styleUrl: './recipes-list.component.scss',
})
export class RecipesListComponent {
    // readonly dialog = inject(MatDialog);
    // readonly recipeService = inject(RecipesService);
    // // readonly categoryService = inject(RecipesCategoryService);
    // readonly destroyRef = inject(DestroyRef);

    // recipeId = input<string>();
    // categoryId = input<string>();

    // recipes$: Observable<RecipeAPI[]> | undefined;
    // // category$: Observable<RecipeCategoryAPI> | undefined;

    // constructor() {
    //     effect(() => {
    //         if (this.categoryId()) {
    //             // this.category$ = this.categoryService.getCategory(this.categoryId()!).pipe(takeUntilDestroyed(this.destroyRef));
    //             // this.recipes$ = this.recipeService.getRecipesByCategoryPublicId(this.categoryId()!).pipe(
    //             // 	takeUntilDestroyed(this.destroyRef),
    //             // 	tap(recipes => console.log(recipes.length)),
    //             // 	catchError(error => { debugger; throw 'error' + error })
    //             // );
    //         }
    //     });
    // }

    // addNewRecipe(): void {
    //     this.dialog
    //         .open(NewItemDialogComponent, {
    //             data: {
    //                 component: NewRecipeDialogComponent,
    //                 itemType: 'recipe',
    //                 // item: this.category$,
    //             },
    //         })
    //         .afterClosed()
    //         .subscribe((result) => {
    //             // debugger;
    //         });
    // }

    recipes: any[] = [];
    page = 1;
    limit = 20;
    loading = false;
    noMoreData = false;

    constructor(private recipeService: RecipesService) {}

    ngOnInit(): void {
        this.loadMore();
    }

    loadMore(): void {
        if (this.loading || this.noMoreData) return;

        this.loading = true;
        this.recipeService
            .getRecipes(this.page, this.limit)
            .subscribe((data) => {
                if (data.length < this.limit) {
                    this.noMoreData = true;
                }

                this.recipes.push(...data);
                this.page++;
                this.loading = false;
            });
    }

    onDrawerClosed(): void {
        console.log('recipe drawer closed');
    }
}
