import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.development';

@Injectable({
	providedIn: 'root'
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

}

export interface ToolAPI {
	publicId: number;
	toolName: string;
}

export interface CreateToolAPI {
	name: string
}