"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const notification_service_1 = require("./notification.service");
const notification_controller_1 = require("./notification.controller");
const notification_entity_1 = require("./entities/notification.entity");
const users_entity_1 = require("../users/users.entity");
const notification_gateway_1 = require("./notification.gateway");
const auth_module_1 = require("../auth/auth.module");
let NotificationModule = exports.NotificationModule = class NotificationModule {
};
exports.NotificationModule = NotificationModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, config_1.ConfigModule, typeorm_1.TypeOrmModule.forFeature([users_entity_1.User, notification_entity_1.Notification])],
        controllers: [notification_controller_1.NotificationController],
        providers: [notification_service_1.NotificationService, notification_gateway_1.NotificationGateway],
        exports: [notification_service_1.NotificationService, notification_gateway_1.NotificationGateway]
    })
], NotificationModule);
//# sourceMappingURL=notification.module.js.map