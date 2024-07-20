export declare class SearchCategoryPaginationDto {
    guid?: string;
    name?: string;
    description?: string;
    isActive?: number;
    createdBy?: string;
    updatedBy?: string;
    offset?: any;
    pageSize?: any;
    orderBy?: 'name' | 'created';
    orderType?: 'ASC' | 'DESC';
}
