"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultWithoutSecurityController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
class DefaultWithoutSecurityController {
    constructor(object) {
        this.object = object;
        this.logger = new common_1.Logger(this.object.name);
    }
}
exports.DefaultWithoutSecurityController = DefaultWithoutSecurityController;
//# sourceMappingURL=default.without-security.controller.js.map