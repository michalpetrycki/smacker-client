import {
    Component,
    EventEmitter,
    input,
    Output,
    signal,
    ViewChild,
} from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { PaginatedResponse } from 'src/app/shared/models/PaginatedResponse';
import { DialogFields } from 'src/app/shared/new-item-dialogs/new-recipe-category-dialog/new-recipe-category-dialog.component';
import {
    Pagination,
    SimpleTableComponent,
} from 'src/app/shared/simple-table/simple-table.component';
import { hugeAdd02 } from '@ng-icons/huge-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
    DrawerEntityBuilderComponent,
    FormType,
} from '../drawer-entity-builder/drawer-entity-builder.component';

@Component({
    selector: 'app-drawer-with-table',
    standalone: true,
    imports: [
        SimpleTableComponent,
        MatSidenavModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatButtonModule,
        FormsModule,
        NgIcon,
        DrawerEntityBuilderComponent,
    ],
    providers: [
        provideIcons({
            hugeAdd02,
        }),
    ],
    templateUrl: './drawer-with-table.component.html',
    styleUrl: './drawer-with-table.component.scss',
})
export class DrawerWithTableComponent<T> {
    displayedColumns: string[] = ['update', 'delete'];
    formData: DialogFields = {};
    originalFormData: DialogFields = {};
    isEditing = false;

    paginatedResponse = input<PaginatedResponse<T>>();
    displayNameProperty = input<string>('');
    noItemsMessage = input<string>('');
    itemType = input<string>('');
    formType = input<FormType>('other');
    editingRowId = signal<string | undefined>(undefined);
    @Output() newItemRequest: EventEmitter<DialogFields> =
        new EventEmitter<DialogFields>();
    @Output() updateItemRequest: EventEmitter<DialogFields> =
        new EventEmitter<DialogFields>();
    @Output() deleteItemRequest: EventEmitter<string> =
        new EventEmitter<string>();
    @Output() nextPageRequest: EventEmitter<Pagination> =
        new EventEmitter<Pagination>();
    @ViewChild('drawer') drawer!: MatDrawer;
    @ViewChild(DrawerEntityBuilderComponent)
    drawerEntityBuilder!: DrawerEntityBuilderComponent<any>;

    onDrawerClosed(): void {
        this.formData = {};
        this.originalFormData = {};
        this.drawerEntityBuilder.clearForm();
    }

    onBuilderDrawerClosed(): void {
        this.onDrawerClosed();
        this.drawer.close();
    }

    cancelEdit(): void {
        this.editingRowId.set(undefined);
        this.formData = {};
        this.originalFormData = {};
        this.isEditing = false;
        this.drawer.close();
    }

    addNew(): void {
        this.isEditing = false;
        this.drawer.open();
    }

    editItem(item: DialogFields): void {
        this.isEditing = true;
        this.editingRowId.set(item['publicId'] as string);
        this.formData = { ...item };
        this.originalFormData = { ...item };
        this.drawer.open();
    }

    /** Saves currently edited row */
    saveRow(row?: DialogFields): void {
        const fields: DialogFields = { ...row, ...this.formData };
        if (this.isEditing) {
            this.editingRowId.set(undefined);
            this.isEditing = false;
            this.updateItemRequest.emit(fields);
        } else {
            this.newItemRequest.emit(fields);
        }
        this.drawer.close();
    }

    deleteItem(publicId: string): void {
        this.deleteItemRequest.emit(publicId);
    }

    requestNextPage(pagination: Pagination): void {
        this.nextPageRequest.emit(pagination);
    }
}
