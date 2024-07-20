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
exports.NotificationType = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const notification_entity_1 = require("./notification.entity");
let NotificationType = exports.NotificationType = class NotificationType {
    static _OPENAPI_METADATA_FACTORY() {
        return { guid: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, isActive: { required: true, type: () => Number }, notification: { required: true, type: () => [require("./notification.entity").Notification] } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], NotificationType.prototype, "guid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1500, nullable: false }),
    __metadata("design:type", String)
], NotificationType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1500, nullable: false }),
    __metadata("design:type", String)
], NotificationType.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', nullable: false, default: '1' }),
    __metadata("design:type", Number)
], NotificationType.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_entity_1.Notification, (notification) => notification.notificationType),
    __metadata("design:type", Array)
], NotificationType.prototype, "notification", void 0);
exports.NotificationType = NotificationType = __decorate([
    (0, typeorm_1.Entity)({ name: 'NotificationType' })
], NotificationType);
//# sourceMappingURL=notificationType.entity.js.map