"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePaymentMethodDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_paymentMethod_dto_1 = require("./create-paymentMethod.dto");
class UpdatePaymentMethodDto extends (0, swagger_1.PartialType)(create_paymentMethod_dto_1.CreatePaymentMethodDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdatePaymentMethodDto = UpdatePaymentMethodDto;
//# sourceMappingURL=update-paymentMethod.dto.js.map