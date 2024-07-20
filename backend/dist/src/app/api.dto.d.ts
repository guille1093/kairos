export declare class ArrayGuidDTO {
    guids: string[];
}
export declare class PaginationDTO {
    offset?: number;
    pageSize?: number;
    orderBy?: 'name' | 'lastname' | 'username';
    orderType?: 'ASC' | 'DESC';
}
export declare class ResposeDTO {
    status: 'success' | 'error';
    message?: string;
}
export declare class ResposeSuccessDataDTO {
    status: 'success' | 'error';
    data?: any;
}
export declare class ResposeResultsPaginationDTO {
    total: number;
    pageSize: number;
    offset: number;
    results: any[];
}
export declare class ResposeSuccessPaginationDTO {
    status: 'success' | 'error';
    data?: ResposeResultsPaginationDTO;
}
