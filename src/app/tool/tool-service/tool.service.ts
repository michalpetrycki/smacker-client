import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateToolAPI } from 'src/app/shared/models/CreateToolAPI';
import { PaginatedResponse } from 'src/app/shared/models/PaginatedResponse';
import { ToolAPI } from 'src/app/shared/models/ToolAPI';
import { Pagination } from 'src/app/shared/simple-table/simple-table.component';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class ToolService {
    http = inject(HttpClient);
    apiBase = environment.baseUrl;
    toolsUrl = `${this.apiBase}/tools`;

    createTool(createToolAPI: CreateToolAPI): Observable<ToolAPI> {
        return this.http.post<ToolAPI>(this.toolsUrl, createToolAPI);
    }

    getTools(pagination: Pagination): Observable<PaginatedResponse<ToolAPI>> {
        let paginationString = `${this.toolsUrl}?pageNo=${pagination.pageNo}&pageSize=${pagination.pageSize}&sortBy=${pagination.sortBy}&sortDirection=${pagination.sortDirection}`;
        if (pagination.filter) {
            paginationString += `&filter=${pagination.filter}`;
        }
        return this.http.get<PaginatedResponse<ToolAPI>>(paginationString);
    }

    updateTool(toolAPI: ToolAPI): Observable<ToolAPI> {
        return this.http.put<ToolAPI>(
            `${this.toolsUrl}/${toolAPI.publicId}`,
            toolAPI
        );
    }

    deleteTool(publicId: string): Observable<boolean> {
        return this.http.delete<boolean>(`${this.toolsUrl}/${publicId}`);
    }
}
