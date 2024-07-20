import { HttpException } from '@nestjs/common';
export declare class OrganizationAlreadyExistsException extends HttpException {
    constructor();
}
export declare class OrganizationNoExistsException extends HttpException {
    constructor();
}
export declare class CustomException extends HttpException {
    constructor(message: string, status: number);
}
