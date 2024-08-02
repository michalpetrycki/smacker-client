import { Component, ComponentRef, ViewChild, ViewContainerRef, inject } from '@angular/core';
import {
	MAT_DIALOG_DATA,
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogRef,
	MatDialogTitle,
} from '@angular/material/dialog';

@Component({
	selector: 'app-new-item-dialog',
	standalone: true,
	imports: [MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle],
	templateUrl: './new-item-dialog.component.html',
	styleUrl: './new-item-dialog.component.scss'
})
export class NewItemDialogComponent {

	@ViewChild('dcontent', { read: ViewContainerRef, static: true }) vcRef: ViewContainerRef | undefined;
	componentRef: ComponentRef<any> | undefined;
	dialogRef = inject(MatDialogRef<NewItemDialogComponent>);
	data = inject<any>(MAT_DIALOG_DATA);

	ngOnInit() {
		this.componentRef = this.vcRef?.createComponent(this.data.component);
	}

	onNoClick(): void {
		this.dialogRef.close(this.componentRef?.instance.fields);
	}

	ngOnDestroy() {
		if (this.componentRef) {
			this.componentRef.destroy();
		}
	}

}
