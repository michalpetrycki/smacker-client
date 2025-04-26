import {
    Component,
    EventEmitter,
    input,
    Input,
    Output,
    signal,
    ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    displayNameProperty = input<string>();
    @Input() itemType = '';
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

    /** Disables "Save" button when there is no change in input */
    get changesDetected(): boolean {
        return this.formData['name'] !== this.originalFormData['name'];
    }

    onDrawerClosed(): void {
        this.formData = {};
        this.originalFormData = {};
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

    updateItem(item: DialogFields): void {
        this.isEditing = true;
        this.editingRowId.set(item['publicId']);
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
