import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DialogFields } from 'src/app/shared/new-item-dialogs/new-recipe-category-dialog/new-recipe-category-dialog.component';

@Component({
    selector: 'app-simple-item-dialog',
    standalone: true,
    imports: [MatButtonModule, FormsModule, ReactiveFormsModule, NgIf],
    templateUrl: './simple-item-dialog.component.html',
    styleUrl: './simple-item-dialog.component.scss',
})
export class SimpleItemDialogComponent {
    @Input() itemType = '';
    @Output() newItemRequest: EventEmitter<DialogFields> =
        new EventEmitter<DialogFields>();
    newItemName = '';
    submit(): void {
        this.newItemRequest.next({
            name: this.newItemName,
        });
    }
}
