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
exports.SearchNotificationDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SearchNotificationDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { guid: { required: false, type: () => String }, name: { required: false, type: () => String }, isActive: { required: false, type: () => Number }, createdByGuid: { required: false, type: () => String }, updatedByGuid: { required: false, type: () => String } };
    }
}
exports.SearchNotificationDto = SearchNotificationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchNotificationDto.prototype, "guid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchNotificationDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'number', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SearchNotificationDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchNotificationDto.prototype, "createdByGuid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchNotificationDto.prototype, "updatedByGuid", void 0);
//# sourceMappingURL=search-notification.dto.js.map