"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomException = exports.PaymentMethodNoExistsException = exports.PaymentMethodAlreadyExistsException = void 0;
const common_1 = require("@nestjs/common");
class PaymentMethodAlreadyExistsException extends common_1.HttpException {
    constructor() {
        super('PaymentMethod already exists', common_1.HttpStatus.CONFLICT);
    }
}
exports.PaymentMethodAlreadyExistsException = PaymentMethodAlreadyExistsException;
class PaymentMethodNoExistsException extends common_1.HttpException {
    constructor() {
        super('PaymentMethod does not exist', common_1.HttpStatus.NOT_FOUND);
    }
}
exports.PaymentMethodNoExistsException = PaymentMethodNoExistsException;
class CustomException extends common_1.HttpException {
    constructor(message, status) {
        super(message, status);
    }
}
exports.CustomException = CustomException;
//# sourceMappingURL=paymentMethod.exeptions.js.map