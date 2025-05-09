import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import {
    Component,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
    MatAutocompleteModule,
    MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {
    combineLatest,
    map,
    Observable,
    startWith,
    Subscription,
    tap,
} from 'rxjs';
import { ProductCategoryService } from 'src/app/product-category/product-category-service/product-category.service';
import { ProductCategoryAPI } from 'src/app/shared/models/ProductCategoryAPI';

@Component({
    selector: 'app-product-autocomplete',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatChipsModule,
        MatIconModule,
        MatAutocompleteModule,
        CommonModule,
        ReactiveFormsModule,
    ],
    templateUrl: './product-autocomplete.component.html',
    styleUrl: './product-autocomplete.component.scss',
})
export class ProductAutocompleteComponent implements OnInit, OnDestroy {
    private _allAvailableCategoriesList: ProductCategoryAPI[] = [];
    private subscriptions = new Subscription();
    @Input() categoriesControl!: FormControl<ProductCategoryAPI[] | null>;
    categoryInputControl = new FormControl<string | ProductCategoryAPI | null>(
        ''
    );

    allAvailableCategories$: Observable<ProductCategoryAPI[]>;
    filteredCategories$!: Observable<ProductCategoryAPI[]>;
    separatorKeysCodes: number[] = [ENTER, COMMA];

    @ViewChild('categoryInput') categoryInput!: ElementRef<HTMLInputElement>;

    constructor(private categoryService: ProductCategoryService) {
        this.allAvailableCategories$ = this.categoryService
            .getAllProductCategories()
            .pipe(
                tap((categories) => {
                    this._allAvailableCategoriesList = categories;
                })
            );
    }

    ngOnInit(): void {
        if (!this.categoriesControl) {
            this.categoriesControl = new FormControl<ProductCategoryAPI[]>(
                [],
                Validators.required
            );
            console.warn(
                'ProductCategoriesComponent: categoriesControl was not provided, using default.'
            );
        }

        const categoriesControlValueChanges$ = (
            this.categoriesControl.valueChanges as Observable<
                ProductCategoryAPI[]
            >
        ).pipe(startWith(this.categoriesControl.value || []));

        this.filteredCategories$ = combineLatest([
            this.categoryInputControl.valueChanges.pipe(
                startWith(''),
                map((value) =>
                    typeof value === 'string' ? value : value?.name || ''
                )
            ),
            this.allAvailableCategories$,
            categoriesControlValueChanges$,
        ]).pipe(
            map(([inputValueName, allCategories, selectedCategories]) => {
                const selectedIds = new Set(
                    (selectedCategories || []).map((c) => c.publicId)
                );
                const unselectedCategories = allCategories.filter(
                    (c) => !selectedIds.has(c.publicId)
                );

                if (!inputValueName) {
                    return unselectedCategories.slice();
                }
                const filterValue = inputValueName.toLowerCase();
                return unselectedCategories.filter((category) =>
                    category.name.toLowerCase().includes(filterValue)
                );
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    addCategoryFromInput(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        if (value) {
            const existingCategory = this._allAvailableCategoriesList.find(
                (cat) => cat.name.toLowerCase() === value.toLowerCase()
            );

            if (existingCategory) {
                this.addCategoryToControl(existingCategory);
            } else {
                console.warn(
                    `Category "${value}" not found in available list. Free-form add is disabled.`
                );
            }
        }

        event.chipInput!.clear();
        this.categoryInputControl.setValue(null);
    }

    selectCategoryFromAutocomplete(event: MatAutocompleteSelectedEvent): void {
        const selectedCategory = event.option.value as ProductCategoryAPI;
        this.addCategoryToControl(selectedCategory);

        if (this.categoryInput) {
            this.categoryInput.nativeElement.value = '';
        }
        this.categoryInputControl.setValue(null);
    }

    private addCategoryToControl(categoryToAdd: ProductCategoryAPI): void {
        const currentCategories = this.categoriesControl.value || [];

        if (
            !currentCategories.find(
                (cat) => cat.publicId === categoryToAdd.publicId
            )
        ) {
            const updatedCategories = [...currentCategories, categoryToAdd];
            this.categoriesControl.setValue(updatedCategories);
            this.categoriesControl.markAsDirty();
            this.categoriesControl.updateValueAndValidity();
        }
    }

    removeCategory(categoryToRemove: ProductCategoryAPI): void {
        const currentCategories = this.categoriesControl.value || [];
        const updatedCategories = currentCategories.filter(
            (category) => category.publicId !== categoryToRemove.publicId
        );
        this.categoriesControl.setValue(updatedCategories);
        this.categoriesControl.markAsDirty();
        this.categoriesControl.updateValueAndValidity(); // Ważne dla walidacji
    }
}
