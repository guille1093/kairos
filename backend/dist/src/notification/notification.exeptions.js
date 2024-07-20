"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomException = exports.NotificationNoExistsException = exports.NotificationAlreadyExistsException = void 0;
const common_1 = require("@nestjs/common");
class NotificationAlreadyExistsException extends common_1.HttpException {
    constructor() {
        super('Notification already exists', common_1.HttpStatus.CONFLICT);
    }
}
exports.NotificationAlreadyExistsException = NotificationAlreadyExistsException;
class NotificationNoExistsException extends common_1.HttpException {
    constructor() {
        super('Notification does not exist', common_1.HttpStatus.NOT_FOUND);
    }
}
exports.NotificationNoExistsException = NotificationNoExistsException;
class CustomException extends common_1.HttpException {
    constructor(message, status) {
        super(message, status);
    }
}
exports.CustomException = CustomException;
//# sourceMappingURL=notification.exeptions.js.map