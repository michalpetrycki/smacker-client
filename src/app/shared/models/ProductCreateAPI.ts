import { ProductCategoryAPI } from 'src/app/shared/models/ProductCategoryAPI';

export interface ProductCreateAPI {
    name: string;
    description?: string;
    carbs?: number;
    fiber?: number;
    fats?: number;
    proteins?: number;
    categories: ProductCategoryAPI[];
}
