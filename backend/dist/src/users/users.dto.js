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
exports.SearchUserPaginationDTO = exports.SearchUserDTO = exports.UpdateUserDTO = exports.CreateUserDTO = exports.googleOAuthDTO = exports.LoginDTO = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const role_enum_1 = require("../roles/role.enum");
class LoginDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { username: { required: true, type: () => String, maxLength: 50 }, password: { required: true, type: () => String, minLength: 3, maxLength: 70 } };
    }
}
exports.LoginDTO = LoginDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginDTO.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(70),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginDTO.prototype, "password", void 0);
class googleOAuthDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { googleID: { required: true, type: () => String }, email: { required: true, type: () => String }, name: { required: true, type: () => String }, lastname: { required: true, type: () => String } };
    }
}
exports.googleOAuthDTO = googleOAuthDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], googleOAuthDTO.prototype, "googleID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], googleOAuthDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], googleOAuthDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], googleOAuthDTO.prototype, "lastname", void 0);
class CreateUserDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { username: { required: true, type: () => String, maxLength: 50 }, document: { required: true, type: () => String, minLength: 7, maxLength: 10 }, phone: { required: true, type: () => String, maxLength: 50 }, birthdate: { required: true, type: () => Date, maxLength: 50 }, profileImage: { required: true, type: () => String, maxLength: 250 }, documentSideA: { required: true, type: () => String, maxLength: 250 }, documentSideB: { required: true, type: () => String, maxLength: 250 }, backgroundCheck: { required: true, type: () => String, maxLength: 250 }, backgroundCheckDate: { required: true, type: () => Date, maxLength: 50 }, backgroundCheckExpirationDate: { required: true, type: () => Date, maxLength: 50 }, mapAdress: { required: true, type: () => String, maxLength: 150 }, address: { required: true, type: () => String, maxLength: 50 }, email: { required: false, type: () => String, maxLength: 50 }, googleID: { required: false, type: () => String, maxLength: 50 }, name: { required: true, type: () => String, minLength: 3, maxLength: 50 }, lastname: { required: false, type: () => String, minLength: 3, maxLength: 50 }, isActive: { required: false, type: () => Number }, isProfessional: { required: false, type: () => Number }, password: { required: true, type: () => String, minLength: 3, maxLength: 70 }, roleGuid: { required: true, type: () => String }, category: { required: false, type: () => String }, availability: { required: false, type: () => ({}) }, description: { required: false, type: () => String }, isAvailable: { required: false, type: () => Number }, paymentMethods: { required: false, type: () => String } };
    }
}
exports.CreateUserDTO = CreateUserDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.MaxLength)(10),
    (0, class_validator_1.MinLength)(7),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "document", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreateUserDTO.prototype, "birthdate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(250),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "profileImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(250),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "documentSideA", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(250),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "documentSideB", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(250),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "backgroundCheck", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreateUserDTO.prototype, "backgroundCheckDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreateUserDTO.prototype, "backgroundCheckExpirationDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.MaxLength)(150),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "mapAdress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "googleID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "lastname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateUserDTO.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'number' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateUserDTO.prototype, "isProfessional", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(70),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, enum: role_enum_1.RoleEnum, type: 'string' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(role_enum_1.RoleEnum, { each: true }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "roleGuid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateUserDTO.prototype, "availability", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateUserDTO.prototype, "isAvailable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "paymentMethods", void 0);
class UpdateUserDTO extends (0, swagger_1.PartialType)(CreateUserDTO) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateUserDTO = UpdateUserDTO;
class SearchUserDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { guid: { required: false, type: () => String }, username: { required: false, type: () => String }, document: { required: false, type: () => String }, isProfessional: { required: false, type: () => Number }, isActive: { required: false, type: () => Number }, password: { required: false, type: () => String }, googleID: { required: false, type: () => String }, email: { required: false, type: () => String }, category: { required: false, type: () => String } };
    }
}
exports.SearchUserDTO = SearchUserDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchUserDTO.prototype, "guid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchUserDTO.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchUserDTO.prototype, "document", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'number' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SearchUserDTO.prototype, "isProfessional", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'number', required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SearchUserDTO.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchUserDTO.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchUserDTO.prototype, "googleID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchUserDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchUserDTO.prototype, "category", void 0);
class SearchUserPaginationDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { guid: { required: false, type: () => String }, name: { required: false, type: () => String }, paymentMethod: { required: false, type: () => String }, phone: { required: false, type: () => String }, lastname: { required: false, type: () => String }, isProfessional: { required: false, type: () => Number }, email: { required: false, type: () => String }, mapAdress: { required: false, type: () => String }, username: { required: false, type: () => String }, document: { required: false, type: () => String }, isActive: { required: false, type: () => Number }, roleGuid: { required: true, type: () => String }, createdByGuid: { required: false, type: () => String }, updatedByGuid: { required: false, type: () => String }, offset: { required: false, type: () => Object }, pageSize: { required: false, type: () => Object }, orderBy: { required: false, type: () => Object }, orderType: { required: false, type: () => Object }, category: { required: false, type: () => String }, categoryID: { required: false, type: () => String } };
    }
}
exports.SearchUserPaginationDTO = SearchUserPaginationDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchUserPaginationDTO.prototype, "guid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchUserPaginationDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchUserPaginationDTO.prototype, "paymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchUserPaginationDTO.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchUserPaginationDTO.prototype, "lastname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'number', required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SearchUserPaginationDTO.prototype, "isProfessional", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchUserPaginationDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchUserPaginationDTO.prototype, "mapAdress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchUserPaginationDTO.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchUserPaginationDTO.prototype, "document", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'number', required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SearchUserPaginationDTO.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, enum: role_enum_1.RoleEnum, type: 'string' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(role_enum_1.RoleEnum, { each: true }),
    __metadata("design:type", String)
], SearchUserPaginationDTO.prototype, "roleGuid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchUserPaginationDTO.prototype, "createdByGuid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchUserPaginationDTO.prototype, "updatedByGuid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, default: 0 }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], SearchUserPaginationDTO.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, default: 10 }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], SearchUserPaginationDTO.prototype, "pageSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: 'string', default: 'name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchUserPaginationDTO.prototype, "orderBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: 'string', default: 'ASC' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchUserPaginationDTO.prototype, "orderType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: 'string', default: '' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchUserPaginationDTO.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: 'string', default: '' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchUserPaginationDTO.prototype, "categoryID", void 0);
//# sourceMappingURL=users.dto.js.map