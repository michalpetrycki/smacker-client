import {
    Component,
    effect,
    EnvironmentInjector,
    EventEmitter,
    inject,
    input,
    OnInit,
    Output,
    runInInjectionContext,
} from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BehaviorSubject } from 'rxjs';
import { ProductCategoryAPI } from 'src/app/shared/models/ProductCategoryAPI';
import { ProductCreateAPI } from 'src/app/shared/models/ProductCreateAPI';
import { ProductAutocompleteComponent } from '../product-autocomplete/product-autocomplete.component';

@Component({
    selector: 'app-product-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatTooltipModule,
        ProductAutocompleteComponent,
    ],
    templateUrl: './product-form.component.html',
    styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
    private injector = inject(EnvironmentInjector);
    data = input<ProductCreateAPI>();
    @Output() submitted = new EventEmitter<ProductCreateAPI>();
    @Output() closeDrawer = new EventEmitter<void>();

    get categoriesFormControl(): FormControl<ProductCategoryAPI[]> {
        return this.formGroup.get('categories') as FormControl<
            ProductCategoryAPI[]
        >;
    }

    disableButton$ = new BehaviorSubject<boolean>(true);

    formGroup = new FormGroup({
        name: new FormControl<string>(''),
        description: new FormControl<string>(''),
        carbs: new FormControl<number>(0, [
            Validators.min(0),
            Validators.max(100),
            Validators.pattern(/^-?\d+(\.\d+)?$/),
        ]),
        fiber: new FormControl<number>(0, [
            Validators.min(0),
            Validators.max(100),
            Validators.pattern(/^-?\d+(\.\d+)?$/),
        ]),
        fats: new FormControl<number>(0, [
            Validators.min(0),
            Validators.max(100),
            Validators.pattern(/^-?\d+(\.\d+)?$/),
        ]),
        proteins: new FormControl<number>(0, [
            Validators.min(0),
            Validators.max(100),
            Validators.pattern(/^-?\d+(\.\d+)?$/),
        ]),
        categories: new FormControl<ProductCategoryAPI[]>(
            [],
            [Validators.required, Validators.minLength(1)]
        ),
    });

    ngOnInit(): void {
        this.formGroup.valueChanges.subscribe((formValue) => {
            const product = this.data();
            const x =
                formValue.name === product?.name &&
                formValue.description === product?.description &&
                formValue.carbs === product?.carbs &&
                formValue.fats === product?.fats &&
                formValue.fiber === product?.fiber &&
                formValue.proteins === product?.proteins &&
                formValue.categories === product?.categories;
            this.disableButton$.next(x);
        });
    }

    ngAfterViewInit(): void {
        runInInjectionContext(this.injector, () => {
            effect(() => {
                const product = this.data();
                if (product) {
                    this.formGroup.get('name')?.patchValue(product.name);
                    this.formGroup
                        .get('description')
                        ?.patchValue(product.description ?? null);
                    this.formGroup
                        .get('carbs')
                        ?.patchValue(Number(product.carbs));
                    this.formGroup
                        .get('fats')
                        ?.patchValue(Number(product.fats));
                    this.formGroup
                        .get('fiber')
                        ?.patchValue(Number(product.fiber));
                    this.formGroup
                        .get('proteins')
                        ?.patchValue(Number(product.proteins));
                    this.categoriesFormControl.setValue(product.categories);
                }
            });
        });
    }

    onSubmit(): void {
        const product: ProductCreateAPI = {
            name: this.formGroup.get('name')?.value ?? '',
            description: this.formGroup.get('name')?.value ?? '',
            carbs: Number(this.formGroup.get('carbs')?.value) ?? 0,
            fats: Number(this.formGroup.get('fats')?.value) ?? 0,
            fiber: Number(this.formGroup.get('fiber')?.value) ?? 0,
            proteins: Number(this.formGroup.get('proteins')?.value) ?? 0,
            categories: this.categoriesFormControl.value ?? [],
        };
        this.submitted.emit(product);
        this.onCancel();
    }

    onCancel(): void {
        Object.keys(this.formGroup.controls).forEach((key) => {
            const control = this.formGroup.get(key);
            control?.setErrors(null);
            control?.markAsPristine();
            control?.markAsUntouched();
        });
        this.closeDrawer.emit();
    }
}
