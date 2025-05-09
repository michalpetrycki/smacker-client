import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
    BehaviorSubject,
    combineLatest,
    Observable,
    switchMap,
    tap,
} from 'rxjs';
import { ToolAPI } from 'src/app/shared/models/ToolAPI';
import { DialogFields } from 'src/app/shared/new-item-dialogs/new-recipe-category-dialog/new-recipe-category-dialog.component';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { ToolService } from 'src/app/tool/tool-service/tool.service';
import { DrawerWithTableComponent } from '../../shared/drawer-with-table/drawer-with-table.component';
import { Pagination } from 'src/app/shared/simple-table/simple-table.component';
import { PaginatedResponse } from 'src/app/shared/models/PaginatedResponse';

@Component({
    selector: 'app-tool-list',
    standalone: true,
    imports: [NgIf, CommonModule, DrawerWithTableComponent],
    templateUrl: './tool-list.component.html',
    styleUrl: './tool-list.component.scss',
})
export class ToolListComponent {
    displayNameProperty = 'name';
    private toolsService = inject(ToolService);
    private snackbarService = inject(SnackbarService);
    private pagination$: BehaviorSubject<Pagination> =
        new BehaviorSubject<Pagination>({
            pageNo: 0,
            pageSize: 5,
            sortDirection: 'asc',
            sortBy: 'toolName',
        });

    refresh$: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);

    paginatedResponse$: Observable<PaginatedResponse<ToolAPI>> = combineLatest([
        this.refresh$,
        this.pagination$,
    ]).pipe(
        switchMap(([_, pagination]) => this.toolsService.getTools(pagination))
    );

    requestNextPage(pagination: Pagination): void {
        this.pagination$.next(pagination);
        this.refresh$.next();
    }

    addTool(fields: DialogFields): void {
        this.toolsService
            .createTool({ name: fields['name'] as string })
            .subscribe((newTool: ToolAPI | null) => {
                if (newTool) {
                    this.snackbarService.displayMessage(
                        `Tool: ${newTool.name} successfully created`
                    );
                    this.refresh$.next();
                }
            });
    }

    deleteTool(publicId: string): void {
        this.toolsService.deleteTool(publicId).subscribe((success: boolean) => {
            if (success) {
                this.snackbarService.displayMessage(
                    success ? 'sukces' : 'chujnia'
                );
                this.refresh$.next();
            }
        });
    }

    updateTool(fields: DialogFields): void {
        this.toolsService
            .updateTool(this.toToolAPI(fields))
            .subscribe((updatedToolAPI: ToolAPI | null) => {
                if (updatedToolAPI) {
                    this.snackbarService.displayMessage(
                        `Tool: ${updatedToolAPI.name} successfully updated`
                    );
                    this.refresh$.next();
                }
            });
    }

    private toToolAPI(fields: DialogFields): ToolAPI {
        return {
            publicId: fields['publicId'] as string,
            name: fields['name'] as string,
        };
    }
}
