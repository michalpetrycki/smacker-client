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
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BehaviorSubject } from 'rxjs';
import { RecipeCategoryAPI } from 'src/app/shared/models/RecipeCategoryAPI';
import { RecipeCategoryCreateAPI } from 'src/app/shared/models/RecipeCategoryCreateAPI';

@Component({
    selector: 'app-recipe-category-form',
    standalone: true,
    imports: [ReactiveFormsModule, MatInputModule],
    templateUrl: './recipe-category-form.component.html',
    styleUrl: './recipe-category-form.component.scss',
})
export class RecipeCategoryFormComponent {
    private injector = inject(EnvironmentInjector);
    data = input<RecipeCategoryAPI>();
    @Output() submitted = new EventEmitter<RecipeCategoryCreateAPI>();
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
        const recipeCategory: RecipeCategoryCreateAPI = {
            name: this.formGroup.get('name')?.value ?? '',
        };
        this.submitted.emit(recipeCategory);
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
