"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const paymentMethod_service_1 = require("./paymentMethod.service");
const paymentMethod_controller_1 = require("./paymentMethod.controller");
const paymentMethod_entity_1 = require("./entities/paymentMethod.entity");
const users_entity_1 = require("../users/users.entity");
let PaymentMethodModule = exports.PaymentMethodModule = class PaymentMethodModule {
};
exports.PaymentMethodModule = PaymentMethodModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule, typeorm_1.TypeOrmModule.forFeature([users_entity_1.User, paymentMethod_entity_1.PaymentMethod])],
        controllers: [paymentMethod_controller_1.PaymentMethodController],
        providers: [paymentMethod_service_1.PaymentMethodService],
        exports: [paymentMethod_service_1.PaymentMethodService]
    })
], PaymentMethodModule);
//# sourceMappingURL=paymentMethod.module.js.map