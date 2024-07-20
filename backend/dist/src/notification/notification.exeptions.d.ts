import { HttpException } from '@nestjs/common';
export declare class NotificationAlreadyExistsException extends HttpException {
    constructor();
}
export declare class NotificationNoExistsException extends HttpException {
    constructor();
}
export declare class CustomException extends HttpException {
    constructor(message: string, status: number);
}
