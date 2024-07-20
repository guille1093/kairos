"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendNotificationsToUserDTO = void 0;
const openapi = require("@nestjs/swagger");
class SendNotificationsToUserDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { recipient: { required: true, type: () => String }, body: { required: true, type: () => String } };
    }
}
exports.SendNotificationsToUserDTO = SendNotificationsToUserDTO;
//# sourceMappingURL=sendNotificationsToUser.dto.js.map