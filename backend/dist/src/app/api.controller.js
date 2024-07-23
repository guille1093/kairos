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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ApiController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const default_without_security_controller_1 = require("./defaults/default.without-security.controller");
const api_dto_1 = require("./api.dto");
const users_dto_1 = require("../users/users.dto");
const auth_service_1 = require("../auth/auth.service");
const api_service_1 = require("./api.service");
let ApiController = exports.ApiController = ApiController_1 = class ApiController extends default_without_security_controller_1.DefaultWithoutSecurityController {
    constructor() {
        super(ApiController_1);
    }
    getInfo() {
        return this.apiService.getInfo();
    }
    async login(body) {
        try {
            const user = await this.authService.validateUser({
                username: body.username,
                password: body.password
            });
            const token = await this.authService.generateAccessToken({ user });
            console.log(token);
            return { status: 'success', data: token };
        }
        catch (error) {
            this.logger.error(error.message ?? error);
            throw new common_1.HttpException({
                status: 'error',
                message: `${ApiController_1.name}-${error.message ?? error}`
            }, error.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async googleoauth(body) {
        try {
            const user = await this.authService.validateGoogleUser({
                name: body.name,
                lastname: body.lastname,
                email: body.email,
                googleID: body.googleID
            });
            const token = await this.authService.generateAccessToken({ user });
            console.log(token);
            return { status: 'success', data: token };
        }
        catch (error) {
            this.logger.error(error.message ?? error);
            throw new common_1.HttpException({
                status: 'error',
                message: `${ApiController_1.name}-${error.message ?? error}`
            }, error.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    (0, common_1.Inject)(api_service_1.ApiService),
    __metadata("design:type", api_service_1.ApiService)
], ApiController.prototype, "apiService", void 0);
__decorate([
    (0, common_1.Inject)(auth_service_1.AuthService),
    __metadata("design:type", auth_service_1.AuthService)
], ApiController.prototype, "authService", void 0);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'API description and version' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], ApiController.prototype, "getInfo", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeSuccessDataDTO, status: common_1.HttpStatus.OK }),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeDTO, status: common_1.HttpStatus.INTERNAL_SERVER_ERROR }),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeDTO, status: common_1.HttpStatus.NOT_FOUND }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("./api.dto").ResposeSuccessDataDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.LoginDTO]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('googleoauth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeSuccessDataDTO, status: common_1.HttpStatus.OK }),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeDTO, status: common_1.HttpStatus.INTERNAL_SERVER_ERROR }),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeDTO, status: common_1.HttpStatus.NOT_FOUND }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("./api.dto").ResposeSuccessDataDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.googleOAuthDTO]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "googleoauth", null);
exports.ApiController = ApiController = ApiController_1 = __decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('API'),
    __metadata("design:paramtypes", [])
], ApiController);
//# sourceMappingURL=api.controller.js.map