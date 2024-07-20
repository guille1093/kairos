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
var NotificationController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const default_controller_1 = require("../app/defaults/default.controller");
const api_dto_1 = require("../app/api.dto");
const role_enum_1 = require("../roles/role.enum");
const notification_service_1 = require("./notification.service");
const create_notification_dto_1 = require("./dto/create-notification.dto");
const update_notification_dto_1 = require("./dto/update-notification.dto");
let NotificationController = exports.NotificationController = NotificationController_1 = class NotificationController extends default_controller_1.DefaultController {
    constructor() {
        super(NotificationController_1);
    }
    async all(query, request) {
        try {
            query.offset = query.offset ? query.offset : 0;
            query.pageSize = query.pageSize ? query.pageSize : 20;
            query.createdBy = request.user.guid;
            return {
                status: 'success',
                data: await this.NotificationService.all({ query: query })
            };
        }
        catch (error) {
            this.logger.error(error.message ?? error);
            throw new common_1.HttpException({
                status: 'error',
                message: `${NotificationController_1.name}-${error.message ?? error}`
            }, error.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(guid) {
        try {
            const Notification = await this.NotificationService.getBy({
                query: { guid: guid }
            });
            return { status: 'success', data: Notification };
        }
        catch (error) {
            this.logger.error(error.message ?? error);
            throw new common_1.HttpException({
                status: 'error',
                message: `${NotificationController_1.name}-${error.message ?? error}`
            }, error.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(body, request) {
        try {
            const Notification = await this.NotificationService.create({
                body: body,
                createdByGUID: request.user.guid
            });
            return { status: 'success', data: Notification };
        }
        catch (error) {
            this.logger.error(error.message ?? error);
            throw new common_1.HttpException({
                status: 'error',
                message: `${NotificationController_1.name}-${error.message ?? error}`
            }, error.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(guid, body, request) {
        try {
            const updatedNotification = await this.NotificationService.update({
                guid: guid,
                body: body,
                updatedByGUID: request.user.guid
            });
            return { status: 'success', data: updatedNotification };
        }
        catch (error) {
            this.logger.error(error.message ?? error);
            throw new common_1.HttpException({
                status: 'error',
                message: `${NotificationController_1.name}-${error.message ?? error}`
            }, error.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    (0, common_1.Inject)(notification_service_1.NotificationService),
    __metadata("design:type", notification_service_1.NotificationService)
], NotificationController.prototype, "NotificationService", void 0);
__decorate([
    (0, common_1.Get)(),
    (0, default_controller_1.Auth)(role_enum_1.RoleEnum.Super, role_enum_1.RoleEnum.ServiceProvier, role_enum_1.RoleEnum.Client, role_enum_1.RoleEnum.Moderator),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get all my notifications' }),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeSuccessPaginationDTO, status: common_1.HttpStatus.OK }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("../app/api.dto").ResposeSuccessPaginationDTO }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "all", null);
__decorate([
    (0, common_1.Get)(':guid'),
    (0, default_controller_1.Auth)(role_enum_1.RoleEnum.Super, role_enum_1.RoleEnum.ServiceProvier, role_enum_1.RoleEnum.Client, role_enum_1.RoleEnum.Moderator),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get one Notification by guid' }),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeSuccessDataDTO, status: common_1.HttpStatus.OK }),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeDTO, status: common_1.HttpStatus.NOT_FOUND }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("../app/api.dto").ResposeSuccessDataDTO }),
    __param(0, (0, common_1.Param)('guid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, default_controller_1.Auth)(role_enum_1.RoleEnum.Super, role_enum_1.RoleEnum.ServiceProvier, role_enum_1.RoleEnum.Client, role_enum_1.RoleEnum.Moderator),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create Notification' }),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeSuccessDataDTO, status: common_1.HttpStatus.CREATED }),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeDTO, status: common_1.HttpStatus.CONFLICT }),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED, type: Object }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_notification_dto_1.CreateNotificationDto, Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':guid'),
    (0, default_controller_1.Auth)(role_enum_1.RoleEnum.Super, role_enum_1.RoleEnum.ServiceProvier, role_enum_1.RoleEnum.Client, role_enum_1.RoleEnum.Moderator),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update Notification' }),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeSuccessDataDTO, status: common_1.HttpStatus.OK }),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeDTO, status: common_1.HttpStatus.NOT_FOUND }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("../app/api.dto").ResposeSuccessDataDTO }),
    __param(0, (0, common_1.Param)('guid')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_notification_dto_1.UpdateNotificationDto, Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "update", null);
exports.NotificationController = NotificationController = NotificationController_1 = __decorate([
    (0, common_1.Controller)('Notification'),
    (0, swagger_1.ApiTags)('Notification'),
    __metadata("design:paramtypes", [])
], NotificationController);
//# sourceMappingURL=notification.controller.js.map