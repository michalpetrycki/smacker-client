import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { ToolAPI } from 'src/app/shared/models/ToolAPI';
import { DialogFields } from 'src/app/shared/new-item-dialogs/new-recipe-category-dialog/new-recipe-category-dialog.component';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { SimpleTableComponent } from 'src/app/shared/simple-table/simple-table.component';
import { ToolService } from 'src/app/tool/tool-service/tool.service';

@Component({
    selector: 'app-tool-list',
    standalone: true,
    imports: [NgIf, CommonModule, SimpleTableComponent],
    templateUrl: './tool-list.component.html',
    styleUrl: './tool-list.component.scss',
})
export class ToolListComponent {
    private toolsService = inject(ToolService);
    private snackbarService = inject(SnackbarService);

    refreshSubject$: BehaviorSubject<void> = new BehaviorSubject<void>(
        undefined
    );

    tools$: Observable<ToolAPI[]> = this.refreshSubject$.pipe(
        switchMap(() => this.toolsService.getTools())
    );

    addTool(fields: DialogFields): void {
        this.toolsService
            .createTool({ name: fields['name'] })
            .subscribe((newTool: ToolAPI | null) => {
                if (newTool) {
                    this.snackbarService.displayMessage(
                        `Tool: ${newTool.name} successfully created`
                    );
                    this.refreshSubject$.next();
                }
            });
    }

    deleteTool(publicId: string): void {
        this.toolsService.deleteTool(publicId).subscribe((success: boolean) => {
            if (success) {
                this.snackbarService.displayMessage(
                    success ? 'sukces' : 'chujnia'
                );
                this.refreshSubject$.next();
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
                    this.refreshSubject$.next();
                }
            });
    }

    private toToolAPI(fields: DialogFields): ToolAPI {
        return {
            publicId: fields['publicId'],
            name: fields['name'],
        };
    }
}
