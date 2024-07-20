"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomException = exports.UsernamePasswordNoExistsException = exports.UserNoExistsException = exports.UserAlreadyExistsException = void 0;
const common_1 = require("@nestjs/common");
class UserAlreadyExistsException extends common_1.HttpException {
    constructor() {
        super('User already exists', common_1.HttpStatus.CONFLICT);
    }
}
exports.UserAlreadyExistsException = UserAlreadyExistsException;
class UserNoExistsException extends common_1.HttpException {
    constructor() {
        super('User does not exist', common_1.HttpStatus.NOT_FOUND);
    }
}
exports.UserNoExistsException = UserNoExistsException;
class UsernamePasswordNoExistsException extends common_1.HttpException {
    constructor() {
        super('Wrong username and/or password', common_1.HttpStatus.NOT_FOUND);
    }
}
exports.UsernamePasswordNoExistsException = UsernamePasswordNoExistsException;
class CustomException extends common_1.HttpException {
    constructor(message, status) {
        super(message, status);
    }
}
exports.CustomException = CustomException;
//# sourceMappingURL=users.exception.js.map