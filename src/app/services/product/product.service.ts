import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';


@Injectable({
	providedIn: 'root'
})
export class ProductService {

	http = inject(HttpClient);
	apiBase = environment.baseUrl;
	productsUrl = `${this.apiBase}/products`;

	createProduct(createProductAPI: CreateProductAPI): Observable<ProductAPI> {
		return this.http.post<ProductAPI>(this.productsUrl, createProductAPI);
	}

	getProducts(): Observable<ProductAPI[]> {
		return this.http.get<ProductAPI[]>(this.productsUrl);
	}
}

export interface ProductAPI {
	publicId: string;
	lastUpdate: Date;
	name: string;
	description: string;
	carbs: number;
	fiber: number;
	fats: number;
	proteins: number;
}

export interface CreateProductAPI {
	name: string;
	description?: string;
	carbs?: number;
	fiber?: number;
	fats?: number;
	proteins?: number;
}