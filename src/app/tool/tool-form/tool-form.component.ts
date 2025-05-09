import { Component, effect, EventEmitter, input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-tool-form',
    standalone: true,
    imports: [],
    templateUrl: './tool-form.component.html',
    styleUrl: './tool-form.component.scss',
})
export class ToolFormComponent {
    data = input<any>();
    @Output() submitted = new EventEmitter<any>();
    @Output() closeDrawer = new EventEmitter<void>();

    disableButton$ = new BehaviorSubject<boolean>(false);

    formGroup = new FormGroup({});

    effect = effect(() => {
        const value = this.data();
        if (value) {
            console.log('Zmieniło się data:', value);
            // twoja logika...
        }
    });

    onSubmit(): void {}

    onCancel(): void {
        this.closeDrawer.emit();
    }
}
