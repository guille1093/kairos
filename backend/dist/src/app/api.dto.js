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
exports.ResposeSuccessPaginationDTO = exports.ResposeResultsPaginationDTO = exports.ResposeSuccessDataDTO = exports.ResposeDTO = exports.PaginationDTO = exports.ArrayGuidDTO = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ArrayGuidDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { guids: { required: true, type: () => [String] } };
    }
}
exports.ArrayGuidDTO = ArrayGuidDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ isArray: true, required: true, type: 'string' }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ArrayGuidDTO.prototype, "guids", void 0);
class PaginationDTO {
    constructor() {
        this.orderBy = 'name';
        this.orderType = 'ASC';
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { offset: { required: false, type: () => Number }, pageSize: { required: false, type: () => Number }, orderBy: { required: false, type: () => Object, default: "name" }, orderType: { required: false, type: () => Object, default: "ASC" } };
    }
}
exports.PaginationDTO = PaginationDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, default: 0 }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Number)
], PaginationDTO.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, default: 10 }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Number)
], PaginationDTO.prototype, "pageSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: 'string', default: 'name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaginationDTO.prototype, "orderBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: 'string', default: 'ASC' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaginationDTO.prototype, "orderType", void 0);
class ResposeDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { status: { required: true, type: () => Object }, message: { required: false, type: () => String } };
    }
}
exports.ResposeDTO = ResposeDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResposeDTO.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResposeDTO.prototype, "message", void 0);
class ResposeSuccessDataDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { status: { required: true, type: () => Object }, data: { required: false, type: () => Object } };
    }
}
exports.ResposeSuccessDataDTO = ResposeSuccessDataDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResposeSuccessDataDTO.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ResposeSuccessDataDTO.prototype, "data", void 0);
class ResposeResultsPaginationDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { total: { required: true, type: () => Number }, pageSize: { required: true, type: () => Number }, offset: { required: true, type: () => Number }, results: { required: true, type: () => [Object] } };
    }
}
exports.ResposeResultsPaginationDTO = ResposeResultsPaginationDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ResposeResultsPaginationDTO.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ResposeResultsPaginationDTO.prototype, "pageSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ResposeResultsPaginationDTO.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Array)
], ResposeResultsPaginationDTO.prototype, "results", void 0);
class ResposeSuccessPaginationDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { status: { required: true, type: () => Object }, data: { required: false, type: () => require("./api.dto").ResposeResultsPaginationDTO } };
    }
}
exports.ResposeSuccessPaginationDTO = ResposeSuccessPaginationDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResposeSuccessPaginationDTO.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", ResposeResultsPaginationDTO)
], ResposeSuccessPaginationDTO.prototype, "data", void 0);
//# sourceMappingURL=api.dto.js.map