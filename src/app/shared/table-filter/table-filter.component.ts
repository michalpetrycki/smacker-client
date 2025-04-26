import {
    Component,
    ElementRef,
    EventEmitter,
    OnInit,
    Output,
    signal,
    ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';

@Component({
    selector: 'app-table-filter',
    standalone: true,
    imports: [MatExpansionModule, MatInputModule, ReactiveFormsModule],
    templateUrl: './table-filter.component.html',
    styleUrl: './table-filter.component.scss',
})
export class TableFilterComponent implements OnInit {
    readonly filterPanelState = signal(false);
    @Output() filterRequest = new EventEmitter<string | undefined>();
    filterControl = new FormControl('');

    ngOnInit(): void {
        this.filterControl.valueChanges
            .pipe(
                map((value: string | null) => {
                    return value ?? undefined;
                }),
                debounceTime(500),
                distinctUntilChanged()
            )
            .subscribe((value) => {
                this.filterRequest.emit(value);
            });
    }
}
