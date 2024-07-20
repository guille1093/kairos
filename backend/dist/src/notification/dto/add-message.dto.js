"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddMessageDto = void 0;
const openapi = require("@nestjs/swagger");
class AddMessageDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { author: { required: true, type: () => String }, body: { required: true, type: () => String } };
    }
}
exports.AddMessageDto = AddMessageDto;
//# sourceMappingURL=add-message.dto.js.map