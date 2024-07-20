export declare class SearchOrganizationPaginationDto {
    guid?: string;
    name?: string;
    isActive?: number;
    createdBy?: string;
    updatedBy?: string;
    offset?: any;
    pageSize?: any;
    orderBy?: 'name' | 'created';
    orderType?: 'ASC' | 'DESC';
}
