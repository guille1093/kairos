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
exports.SearchOrganizationPaginationDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SearchOrganizationPaginationDto {
    constructor() {
        this.orderBy = 'name';
        this.orderType = 'ASC';
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { guid: { required: false, type: () => String }, name: { required: false, type: () => String }, isActive: { required: false, type: () => Number }, createdBy: { required: false, type: () => String }, updatedBy: { required: false, type: () => String }, offset: { required: false, type: () => Object }, pageSize: { required: false, type: () => Object }, orderBy: { required: false, type: () => Object, default: "name" }, orderType: { required: false, type: () => Object, default: "ASC" } };
    }
}
exports.SearchOrganizationPaginationDto = SearchOrganizationPaginationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchOrganizationPaginationDto.prototype, "guid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchOrganizationPaginationDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'number', required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SearchOrganizationPaginationDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchOrganizationPaginationDto.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchOrganizationPaginationDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, default: 0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], SearchOrganizationPaginationDto.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, default: 10 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Object)
], SearchOrganizationPaginationDto.prototype, "pageSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: 'string', default: 'name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchOrganizationPaginationDto.prototype, "orderBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: 'string', default: 'ASC' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchOrganizationPaginationDto.prototype, "orderType", void 0);
//# sourceMappingURL=search-pagination-organization.dto.js.map