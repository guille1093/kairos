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
var NotificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const defatul_service_1 = require("../app/defaults/defatul.service");
const typeorm_2 = require("typeorm");
const notification_entity_1 = require("./entities/notification.entity");
const notification_exeptions_1 = require("./notification.exeptions");
const notification_gateway_1 = require("./notification.gateway");
let NotificationService = exports.NotificationService = NotificationService_1 = class NotificationService extends defatul_service_1.DefaultService {
    constructor() {
        super(NotificationService_1);
    }
    async getBy(params) {
        try {
            const notification = await this.notificationRepository.findOne({
                select: {
                    guid: true,
                    title: true,
                    description: true,
                    link: true,
                    createdAt: true,
                    isActive: true,
                },
                relations: [],
                where: {
                    guid: params.query.guid || undefined,
                    isActive: params.query.isActive || undefined,
                    deletedAt: (0, typeorm_2.IsNull)()
                }
            });
            return notification;
        }
        catch (error) {
            throw new Error(`${NotificationService_1.name}[getBy]:${error.message}`);
        }
    }
    async all(params) {
        try {
            const order = {};
            if (params.query.orderBy && params.query.orderType) {
                order[params.query.orderBy] = params.query.orderType;
            }
            const forPage = parseInt(params.query.pageSize);
            const skip = parseInt(params.query.offset);
            const [notification, total] = await this.notificationRepository.findAndCount({
                select: {
                    guid: true,
                    title: true,
                    description: true,
                    link: true,
                    createdAt: true,
                    isActive: true,
                },
                relations: [],
                where: {
                    deletedAt: (0, typeorm_2.IsNull)(),
                    createdBy: {
                        guid: params.query.createdBy || undefined
                    },
                    isActive: params.query.isActive || undefined
                },
                order,
                take: forPage,
                skip: skip
            });
            return {
                total: total,
                pageSize: forPage,
                offset: parseInt(params.query.offset),
                results: notification
            };
        }
        catch (error) {
            throw new Error(`${NotificationService_1.name}[all]:${error.message}`);
        }
    }
    async create(params) {
        try {
            const notification = await this.notificationRepository.save({
                title: params.body.title,
                link: params.body.link,
                description: params.body.description,
                isActive: params.body.isActive || 1,
                createdBy: { guid: params.createdByGUID }
            });
            this.notificationGateway.sendNotificationTo(notification.createdBy.guid, notification);
            return notification;
        }
        catch (error) {
            throw new Error(`${NotificationService_1.name}[create]:${error.message}`);
        }
    }
    async update(params) {
        try {
            const notification = await this.notificationRepository.findOne({
                where: { guid: params.guid, deletedAt: (0, typeorm_2.IsNull)() }
            });
            if (!notification) {
                throw new notification_exeptions_1.NotificationNoExistsException();
            }
            notification.description = params.body.description || notification.description;
            notification.isActive = params.body.isActive !== undefined ? params.body.isActive : notification.isActive;
            return await this.notificationRepository.save(notification);
        }
        catch (error) {
            throw new Error(`${NotificationService_1.name}[update]:${error.message}`);
        }
    }
};
__decorate([
    (0, typeorm_1.InjectRepository)(notification_entity_1.Notification),
    __metadata("design:type", typeorm_2.Repository)
], NotificationService.prototype, "notificationRepository", void 0);
__decorate([
    (0, common_1.Inject)(notification_gateway_1.NotificationGateway),
    __metadata("design:type", notification_gateway_1.NotificationGateway)
], NotificationService.prototype, "notificationGateway", void 0);
exports.NotificationService = NotificationService = NotificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], NotificationService);
//# sourceMappingURL=notification.service.js.map