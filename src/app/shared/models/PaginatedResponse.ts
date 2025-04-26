export interface PaginatedResponse<T> {
    totalCount: number;
    results: T[];
}
