"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultController = exports.Auth = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../../roles/decorators/roles.decorator");
const api_dto_1 = require("../api.dto");
const jwt_auth_guard_1 = require("../../auth/guard/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guard/roles.guard");
const Auth = (...roles) => (0, common_1.applyDecorators)((0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, roles_decorator_1.Roles)(...roles), (0, common_1.UseGuards)(roles_guard_1.RolesGuard));
exports.Auth = Auth;
let DefaultController = exports.DefaultController = class DefaultController {
    constructor(object) {
        this.object = object;
        this.logger = new common_1.Logger(this.object.name);
    }
};
exports.DefaultController = DefaultController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeDTO, status: common_1.HttpStatus.INTERNAL_SERVER_ERROR }),
    __metadata("design:paramtypes", [Object])
], DefaultController);
//# sourceMappingURL=default.controller.js.map