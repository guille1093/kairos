"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomException = exports.OrganizationNoExistsException = exports.OrganizationAlreadyExistsException = void 0;
const common_1 = require("@nestjs/common");
class OrganizationAlreadyExistsException extends common_1.HttpException {
    constructor() {
        super('Organization already exists', common_1.HttpStatus.CONFLICT);
    }
}
exports.OrganizationAlreadyExistsException = OrganizationAlreadyExistsException;
class OrganizationNoExistsException extends common_1.HttpException {
    constructor() {
        super('Organization does not exist', common_1.HttpStatus.NOT_FOUND);
    }
}
exports.OrganizationNoExistsException = OrganizationNoExistsException;
class CustomException extends common_1.HttpException {
    constructor(message, status) {
        super(message, status);
    }
}
exports.CustomException = CustomException;
//# sourceMappingURL=organization.exeptions.js.map