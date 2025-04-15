import { CommonModule } from '@angular/common';
import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    QueryList,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { DialogFields } from 'src/app/shared/new-item-dialogs/new-recipe-category-dialog/new-recipe-category-dialog.component';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-simple-table',
    standalone: true,
    imports: [
        MatTableModule,
        MatButtonModule,
        FormsModule,
        CommonModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    templateUrl: './simple-table.component.html',
    styleUrl: './simple-table.component.scss',
})
export class SimpleTableComponent<T> implements OnInit {
    @Input() dataSource: T[] = [];
    @Input() displayNameProperty = '';
    @Input() itemType = '';
    @Output() newItemRequest: EventEmitter<DialogFields> =
        new EventEmitter<DialogFields>();
    @Output() updateItemRequest: EventEmitter<DialogFields> =
        new EventEmitter<DialogFields>();
    @Output() deleteItemRequest: EventEmitter<string> =
        new EventEmitter<string>();
    @ViewChild('drawer') drawer!: MatDrawer;
    @ViewChildren('editInput') editInputs!: QueryList<ElementRef>;
    @ViewChildren('updateButton') updateButtons!: QueryList<ElementRef>;
    displayedColumns: string[] = ['update', 'delete'];

    editingRowId: string | null = null;
    formData: DialogFields = {};
    originalFormData: DialogFields = {};
    isEditing = false;

    /** Disables "Save" button when there is no change in input */
    get changesDetected(): boolean {
        return this.formData['name'] !== this.originalFormData['name'];
    }

    ngOnInit(): void {
        this.displayedColumns.splice(0, 0, this.displayNameProperty);
    }

    addNew(): void {
        this.isEditing = false;
        this.drawer.open();
    }

    /** Opens left drawer */
    editRow(item: DialogFields): void {
        this.isEditing = true;
        this.editingRowId = item['publicId'];
        this.formData = { ...item };
        this.originalFormData = { ...item };
        this.drawer.open();
    }

    /** Saves currently edited row */
    saveRow(row?: DialogFields): void {
        const fields: DialogFields = { ...row, ...this.formData };
        if (this.isEditing) {
            this.editingRowId = null;
            this.isEditing = false;
            this.updateItemRequest.next(fields);
        } else {
            this.newItemRequest.next(fields);
        }
        this.drawer.close();
    }

    cancelEdit(): void {
        this.editingRowId = null;
        this.formData = {};
        this.originalFormData = {};
        this.isEditing = false;
        this.drawer.close();
    }

    deleteItem(publicId: string): void {
        this.deleteItemRequest.next(publicId);
    }

    onDrawerClosed(): void {
        this.editingRowId = null;
        this.formData = {};
        this.originalFormData = {};
    }
}
