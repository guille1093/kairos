import { HttpException } from '@nestjs/common';
export declare class UserAlreadyExistsException extends HttpException {
    constructor();
}
export declare class UserNoExistsException extends HttpException {
    constructor();
}
export declare class UsernamePasswordNoExistsException extends HttpException {
    constructor();
}
export declare class CustomException extends HttpException {
    constructor(message: string, status: number);
}
