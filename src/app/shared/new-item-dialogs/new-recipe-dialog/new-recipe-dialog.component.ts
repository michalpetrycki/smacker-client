import { CommonModule } from '@angular/common';
import { Component, Signal, WritableSignal, computed, inject, model, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { toSignal } from '@angular/core/rxjs-interop';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ToolAPI, ToolService } from 'src/app/services/tool/tool.service';
import { ProductAPI, ProductService } from 'src/app/services/product/product.service';
import { MatButtonModule } from '@angular/material/button';


@Component({
	selector: 'app-new-recipe-dialog',
	standalone: true,
	imports: [MatStepperModule, MatFormField, FormsModule, MatLabel, ReactiveFormsModule, MatInputModule, MatListModule, MatButtonModule,
		MatIconModule, MatAutocompleteModule, CommonModule, MatChipsModule],
	templateUrl: './new-recipe-dialog.component.html',
	styleUrl: './new-recipe-dialog.component.scss'
})
export class NewRecipeDialogComponent {




	readonly productService = inject(ProductService);
	readonly toolService = inject(ToolService);
	readonly separatorKeysCodes: number[] = [ENTER, COMMA];

	/** Ingredients autocomplete */
	productsFormGroup: FormGroup;
	readonly currentProduct = model('');
	readonly selectedProducts: WritableSignal<ProductAPI[]> = signal([]);
	readonly productsOptions = toSignal(this.productService.getProducts());
	readonly filteredProducts = computed(() => {
		const currentProduct = this.currentProduct()?.toLowerCase();
		return currentProduct ? this.productsOptions()?.filter(product => product.name.toLowerCase().includes(currentProduct))
			: this.productsOptions()?.slice();
	});

	selectedProduct(event: MatAutocompleteSelectedEvent): void {
		const selectedProduct: ProductAPI = event.option.value as ProductAPI;
		this.selectedProducts.update(products => [...products, selectedProduct]);
		this.currentProduct.set('');
		event.option.deselect();
	}

	addProduct(ing: any): void {
		// this.products.push(ing);
		// this.productsFormGroup.get('product')?.setValue('');
	}

	removeProduct(ing: any): void {
		this.products.controls.splice(0, 1);
	}

	/** End of ingredients autocomplete */

	/** Tools autocomplete */
	toolsFormGroup: FormGroup;
	readonly currentTool = model('');
	readonly selectedTools: WritableSignal<ToolAPI[]> = signal([]);
	readonly toolsOptions = toSignal(this.toolService.getTools());
	readonly filteredTools = computed(() => {
		const currentTool = this.currentTool()?.toLowerCase();
		return currentTool ? this.toolsOptions()?.filter(tool => tool.toolName.toLowerCase().includes(currentTool))
			: this.toolsOptions()?.slice();
	});

	selectedTool(event: MatAutocompleteSelectedEvent): void {
		const selectedTool: ToolAPI = event.option.value as ToolAPI;
		this.selectedTools.update(tools => [...tools, selectedTool]);
		this.currentTool.set('');
		event.option.deselect();
	}


	addTool(event: MatChipInputEvent): void {
		const value = (event.value || '').trim();

		debugger;

		if (value) {
			// this.selectedTools.update(tools => [...tools, value]);
		}

		this.currentTool.set('');
	}

	removeTool(tool: any): void {
		this.tools.controls.splice(0, 1);
	}

	/** End of tools autocomplete */

	// stateGroupOptions: Observable<any> = of([
	// 	{ letter: 'A', names: ['Agata', 'Ada', 'Ala'] },
	// 	{ letter: 'B', names: ['Basia', 'Bibi', 'Bubu'] },
	// 	{ letter: 'C', names: ['Chania', 'Cysia', 'Cola'] }
	// ]);

	detailsFormGroup: FormGroup;
	instructionsFormGroup: FormGroup;

	detailsGroupControls: InputControl[] = [
		{ name: 'name', required: true },
		{ name: 'description' }
	];

	// ingredientsGroupControls: InputControl[] = [
	// 	{ name: 'ingredients' },
	// ];

	// toolsGroupControls: InputControl[] = [
	// 	{ name: 'tools' },
	// ];

	instructionsGroupControls: InputControl[] = [
		{ name: 'steps' }
	];

	get products(): FormArray {
		return this.productsFormGroup.get('products') as FormArray;
	}

	get tools(): FormArray {
		return this.toolsFormGroup.get('tools') as FormArray;
	}

	get steps(): FormArray {
		return this.instructionsFormGroup.get('steps') as FormArray;
	}

	// chosenTools: any[] = [];
	// chosenIngredients: any[] = [];

	constructor(private fb: FormBuilder) {

		this.detailsFormGroup = new FormGroup({});
		this.productsFormGroup = new FormGroup({
			product: new FormControl(null),
			products: this.fb.array([])
		});
		this.toolsFormGroup = new FormGroup({
			tool: new FormControl(null),
			tools: this.fb.array([])
		});
		this.instructionsFormGroup = new FormGroup({
			step: new FormControl(null),
			steps: this.fb.array([])
		});

		for (let control of this.detailsGroupControls) {
			const validators = control.required ? Validators.required : null;
			const formControl = new FormControl<string | null>('', validators);
			this.detailsFormGroup.addControl(control.name, formControl);
		}

		// this.filteredToolsOptions = this.toolsFormGroup.get('tool')?.valueChanges.pipe(startWith(''), map(value => this._filterTools(value || '')));

	}

	addStep(): void {
		this.steps.push(new FormControl<string | null>(this.instructionsFormGroup.get('step')?.getRawValue()));
		this.instructionsFormGroup.get('step')?.setValue(null);
	}

	removeStep(index: number): void {
		this.steps.controls.splice(index, 1);
	}

}

interface InputControl {
	name: string;
	required?: boolean;
}