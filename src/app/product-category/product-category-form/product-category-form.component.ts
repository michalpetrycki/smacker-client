import {
    Component,
    effect,
    EnvironmentInjector,
    EventEmitter,
    inject,
    input,
    Output,
    runInInjectionContext,
} from '@angular/core';
import {
    ReactiveFormsModule,
    FormGroup,
    FormControl,
    Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BehaviorSubject } from 'rxjs';
import { ProductCategoryAPI } from 'src/app/shared/models/ProductCategoryAPI';
import { ProductCategoryCreateAPI } from 'src/app/shared/models/ProductCategoryCreateAPI';

@Component({
    selector: 'app-product-category-form',
    standalone: true,
    imports: [ReactiveFormsModule, MatInputModule],
    templateUrl: './product-category-form.component.html',
    styleUrl: './product-category-form.component.scss',
})
export class ProductCategoryFormComponent {
    private injector = inject(EnvironmentInjector);
    data = input<ProductCategoryAPI>();
    @Output() submitted = new EventEmitter<ProductCategoryCreateAPI>();
    @Output() closeDrawer = new EventEmitter<void>();

    disableButton$ = new BehaviorSubject<boolean>(true);

    formGroup = new FormGroup({
        name: new FormControl<string>('', [
            Validators.required,
            Validators.minLength(1),
        ]),
    });

    ngOnInit(): void {
        this.formGroup.valueChanges.subscribe((formValue) => {
            const category = this.data();
            const x = formValue.name === category?.name;
            this.disableButton$.next(x);
        });
    }

    ngAfterViewInit(): void {
        runInInjectionContext(this.injector, () => {
            effect(() => {
                const category = this.data();
                if (category) {
                    this.formGroup.get('name')?.patchValue(category.name);
                }
            });
        });
    }

    onSubmit(): void {
        const category: ProductCategoryCreateAPI = {
            name: this.formGroup.get('name')?.value ?? '',
        };
        this.submitted.emit(category);
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
