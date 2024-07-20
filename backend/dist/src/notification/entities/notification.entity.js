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
exports.Notification = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../../users/users.entity");
const notificationType_entity_1 = require("./notificationType.entity");
let Notification = exports.Notification = class Notification {
    static _OPENAPI_METADATA_FACTORY() {
        return { guid: { required: true, type: () => String }, title: { required: true, type: () => String }, description: { required: true, type: () => String }, link: { required: true, type: () => String }, isActive: { required: true, type: () => Number }, createdBy: { required: false, type: () => require("../../users/users.entity").User }, updatedBy: { required: false, type: () => require("../../users/users.entity").User }, deletedBy: { required: false, type: () => require("../../users/users.entity").User }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: false, type: () => Date }, notificationType: { required: true, type: () => require("./notificationType.entity").NotificationType } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Notification.prototype, "guid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1500, nullable: false }),
    __metadata("design:type", String)
], Notification.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1500, nullable: false }),
    __metadata("design:type", String)
], Notification.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1500, nullable: true }),
    __metadata("design:type", String)
], Notification.prototype, "link", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', nullable: false, default: '1' }),
    __metadata("design:type", Number)
], Notification.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User, (user) => user.userCreated, {
        nullable: true,
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    __metadata("design:type", users_entity_1.User)
], Notification.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User, (user) => user.userUpdated, {
        nullable: true,
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    __metadata("design:type", users_entity_1.User)
], Notification.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User, (user) => user.userDeleted, {
        nullable: true,
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    __metadata("design:type", users_entity_1.User)
], Notification.prototype, "deletedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Notification.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Notification.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Notification.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => notificationType_entity_1.NotificationType, (notificationType) => notificationType.notification),
    __metadata("design:type", notificationType_entity_1.NotificationType)
], Notification.prototype, "notificationType", void 0);
exports.Notification = Notification = __decorate([
    (0, typeorm_1.Entity)({ name: 'Notification' })
], Notification);
//# sourceMappingURL=notification.entity.js.map