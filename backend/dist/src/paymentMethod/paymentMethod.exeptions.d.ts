import { HttpException } from '@nestjs/common';
export declare class PaymentMethodAlreadyExistsException extends HttpException {
    constructor();
}
export declare class PaymentMethodNoExistsException extends HttpException {
    constructor();
}
export declare class CustomException extends HttpException {
    constructor(message: string, status: number);
}
