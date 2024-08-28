import { CommonModule } from '@angular/common';
import { Component, ComponentRef, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
	MAT_DIALOG_DATA,
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogRef,
	MatDialogTitle,
} from '@angular/material/dialog';
import { Observable, of } from 'rxjs';

@Component({
	selector: 'app-new-item-dialog',
	standalone: true,
	imports: [MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle, MatButtonModule, CommonModule],
	templateUrl: './new-item-dialog.component.html',
	styleUrl: './new-item-dialog.component.scss'
})
export class NewItemDialogComponent {

	@ViewChild('dcontent', { read: ViewContainerRef, static: true }) vcRef: ViewContainerRef | undefined;
	componentRef: ComponentRef<any> | undefined;
	dialogRef = inject(MatDialogRef<NewItemDialogComponent>);
	data = inject<any>(MAT_DIALOG_DATA);
	itemType?: string;
	item$?: Observable<any>;

	ngOnInit() {
		this.componentRef = this.vcRef?.createComponent(this.data.component);
		this.itemType = this.data.itemType ?? '';
		this.item$ = this.data.item ?? of(null);
	}

	ngOnDestroy() {
		if (this.componentRef) {
			this.componentRef.destroy();
		}
	}

}
