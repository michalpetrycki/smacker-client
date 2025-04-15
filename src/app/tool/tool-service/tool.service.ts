import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateToolAPI } from 'src/app/shared/models/CreateToolAPI';
import { ToolAPI } from 'src/app/shared/models/ToolAPI';
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

    getTools(): Observable<ToolAPI[]> {
        return this.http.get<ToolAPI[]>(this.toolsUrl);
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
