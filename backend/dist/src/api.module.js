"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const api_controller_1 = require("./app/api.controller");
const api_service_1 = require("./app/api.service");
const users_module_1 = require("./users/users.module");
const categories_module_1 = require("./categories/categories.module");
const paymentMethod_module_1 = require("./paymentMethod/paymentMethod.module");
const notification_module_1 = require("./notification/notification.module");
const organization_module_1 = require("./organization/organization.module");
let ApiModule = exports.ApiModule = class ApiModule {
};
exports.ApiModule = ApiModule = __decorate([
    (0, common_1.Module)({
        imports: [users_module_1.UsersModule, auth_module_1.AuthModule, categories_module_1.CategoriesModule, paymentMethod_module_1.PaymentMethodModule, notification_module_1.NotificationModule, organization_module_1.OrganizationModule],
        providers: [api_service_1.ApiService],
        controllers: [api_controller_1.ApiController],
        exports: []
    })
], ApiModule);
//# sourceMappingURL=api.module.js.map