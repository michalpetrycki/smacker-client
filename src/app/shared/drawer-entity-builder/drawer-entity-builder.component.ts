import {
    Component,
    ComponentRef,
    effect,
    EventEmitter,
    input,
    Input,
    Output,
    Type,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { ProductListComponent } from 'src/app/product/product-list/product-list.component';
import { ToolFormComponent } from 'src/app/tool/tool-form/tool-form.component';
import { ProductFormComponent } from 'src/app/product/product-form/product-form.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { hugeAdd02, hugeCancel02 } from '@ng-icons/huge-icons';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RecipeCategoryFormComponent } from 'src/app/recipe-category/recipe-category-form/recipe-category-form.component';
import { ProductCategoryFormComponent } from 'src/app/product-category/product-category-form/product-category-form.component';

export type FormType =
    | 'tool'
    | 'product'
    | 'recipeCategory'
    | 'productCategory'
    | 'other';

@Component({
    selector: 'app-drawer-entity-builder',
    standalone: true,
    templateUrl: './drawer-entity-builder.component.html',
    styleUrl: './drawer-entity-builder.component.scss',
    imports: [NgIcon, MatButtonModule, CommonModule],
    providers: [
        provideIcons({
            hugeAdd02,
            hugeCancel02,
        }),
    ],
})
export class DrawerEntityBuilderComponent<T> {
    @Input() isEditing = false;
    editItem = input<T>();

    @Input() type!: FormType;
    @Input() data: any;
    @Output() closed = new EventEmitter<void>();
    @Output() addItemRequest = new EventEmitter<T>();

    @ViewChild('formHost', { read: ViewContainerRef })
    formHost!: ViewContainerRef;

    buttonDisabled = true;

    formComponent:
        | ComponentRef<ToolFormComponent | ProductFormComponent>
        | undefined;

    private componentMap: Record<FormType, Type<any>> = {
        tool: ToolFormComponent,
        product: ProductFormComponent,
        recipeCategory: RecipeCategoryFormComponent,
        productCategory: ProductCategoryFormComponent,
        other: ProductListComponent,
    };

    constructor() {
        effect(() => {
            this.formComponent?.setInput('data', this.editItem());
        });
    }

    ngAfterViewInit() {
        this.loadFormComponent();
    }

    loadFormComponent() {
        const component = this.componentMap[this.type];
        if (!component) return;

        this.formHost.clear();
        this.formComponent = this.formHost.createComponent(component);
        this.formComponent.setInput('data', this.editItem());

        if (this.formComponent.instance.submitted) {
            this.formComponent.instance.submitted.subscribe((result: T) => {
                this.addItemRequest.emit(result);
            });

            this.formComponent.instance.closeDrawer.subscribe(() => {
                this.closed.emit();
            });

            this.formComponent?.instance?.disableButton$.subscribe(
                (disable) => {
                    if (disable !== undefined) {
                        this.buttonDisabled = disable;
                    }
                }
            );
        }
    }

    clearForm(): void {
        this.formComponent?.instance.onCancel();
    }
}
