import { CommonModule } from '@angular/common';
import {
    Component,
    computed,
    effect,
    EventEmitter,
    input,
    OnInit,
    Output,
    signal,
    ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
    MatPaginator,
    MatPaginatorModule,
    PageEvent,
} from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { PaginatedResponse } from 'src/app/shared/models/PaginatedResponse';
import { DialogFields } from 'src/app/shared/new-item-dialogs/new-recipe-category-dialog/new-recipe-category-dialog.component';
import { TableFilterComponent } from 'src/app/shared/table-filter/table-filter.component';

@Component({
    selector: 'app-simple-table',
    standalone: true,
    imports: [
        MatTableModule,
        MatButtonModule,
        FormsModule,
        CommonModule,
        MatPaginatorModule,
        MatSortModule,
        TableFilterComponent,
    ],
    templateUrl: './simple-table.component.html',
    styleUrl: './simple-table.component.scss',
})
export class SimpleTableComponent<T> implements OnInit {
    displayedColumns: string[] = ['update', 'delete'];
    showTable = computed(() => this.paginatedResponse()?.totalCount! > 0);
    paginatedResponse = input<PaginatedResponse<T>>();
    editingRowId = input<string>();
    displayNameProperty = input<string>();
    noItemsMessage = input<string>();

    @Output() editItemRequest: EventEmitter<DialogFields> =
        new EventEmitter<DialogFields>();
    @Output() deleteItemRequest: EventEmitter<string> =
        new EventEmitter<string>();
    @Output() pageRequest: EventEmitter<Pagination> =
        new EventEmitter<Pagination>();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) matSort!: MatSort;

    pageSize = signal<number>(5);
    pageIndex = signal<number>(0);
    filter = signal<string | undefined>(undefined);
    sort = signal<{ active: string; direction: 'asc' | 'desc' | '' }>({
        active: '',
        direction: 'asc',
    });

    constructor() {
        effect(() => {
            this.sort().active = this.displayNameProperty() ?? '';

            const pagination: Pagination = {
                pageNo: this.pageIndex(),
                pageSize: this.pageSize(),
                sortBy: this.sort().active,
                sortDirection: this.sort().direction,
                filter: this.filter(),
            };
            this.pageRequest.emit(pagination);
        });
    }

    ngOnInit(): void {
        this.displayedColumns.splice(0, 0, this.displayNameProperty()!);
    }

    editRow(item: DialogFields): void {
        this.editItemRequest.emit(item);
    }

    deleteItem(publicId: string): void {
        this.deleteItemRequest.emit(publicId);
    }

    onPageChange(event: PageEvent): void {
        this.pageIndex.set(event.pageIndex);
        this.pageSize.set(event.pageSize);
    }

    onSortChange(event: Sort): void {
        this.sort.set({
            active: event.active,
            direction: event.direction,
        });
    }

    onFilterChange(value: string | undefined): void {
        this.filter.set(value);
    }
}

export interface Pagination {
    pageNo: number;
    pageSize: number;
    sortBy: string;
    sortDirection: 'asc' | 'desc' | '';
    filter?: string;
}
