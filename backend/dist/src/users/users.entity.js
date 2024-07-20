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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const category_entity_1 = require("../categories/entities/category.entity");
const paymentMethod_entity_1 = require("../paymentMethod/entities/paymentMethod.entity");
const roles_entity_1 = require("../roles/roles.entity");
const organization_entity_1 = require("../organization/entities/organization.entity");
let User = exports.User = User_1 = class User {
    static _OPENAPI_METADATA_FACTORY() {
        return { guid: { required: true, type: () => String }, document: { required: true, type: () => String }, name: { required: true, type: () => String }, lastname: { required: true, type: () => String }, email: { required: true, type: () => String }, address: { required: true, type: () => String }, birthdate: { required: true, type: () => Date }, profileImage: { required: true, type: () => String }, documentSideA: { required: true, type: () => String }, documentSideB: { required: true, type: () => String }, backgroundCheck: { required: true, type: () => String }, backgroundCheckDate: { required: true, type: () => Date }, backgroundCheckExpirationDate: { required: true, type: () => Date }, phone: { required: true, type: () => String }, mapAdress: { required: true, type: () => String }, username: { required: true, type: () => String }, googleID: { required: true, type: () => String }, role: { required: true, type: () => require("../roles/roles.entity").Role }, isActive: { required: true, type: () => Number }, password: { required: true, type: () => String }, createdBy: { required: false, type: () => require("./users.entity").User }, updatedBy: { required: false, type: () => require("./users.entity").User }, deletedBy: { required: false, type: () => require("./users.entity").User }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: false, type: () => Date }, userCreated: { required: true, type: () => [require("./users.entity").User] }, userUpdated: { required: true, type: () => [require("./users.entity").User] }, userDeleted: { required: true, type: () => [require("./users.entity").User] }, category: { required: true, type: () => [require("../categories/entities/category.entity").Category] }, paymentMethod: { required: true, type: () => [require("../paymentMethod/entities/paymentMethod.entity").PaymentMethod] }, Organization: { required: true, type: () => [require("../paymentMethod/entities/paymentMethod.entity").PaymentMethod] }, availability: { required: true, type: () => String }, description: { required: true, type: () => String }, previusWorks: { required: true, type: () => String }, certifications: { required: true, type: () => String }, isAvailable: { required: true, type: () => Number } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "guid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, nullable: true }),
    (0, typeorm_1.Unique)(['document']),
    __metadata("design:type", String)
], User.prototype, "document", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "lastname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: false }),
    (0, typeorm_1.Unique)(['email']),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "birthdate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "profileImage", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "documentSideA", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "documentSideB", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "backgroundCheck", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "backgroundCheckDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "backgroundCheckExpirationDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "mapAdress", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: false }),
    (0, typeorm_1.Unique)(['username']),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "googleID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => roles_entity_1.Role, (role) => role.users, {
        nullable: false,
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    (0, typeorm_1.JoinColumn)({ foreignKeyConstraintName: 'Users_Roles_fk', name: 'roleGuid' }),
    __metadata("design:type", roles_entity_1.Role)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', nullable: false, default: '1' }),
    __metadata("design:type", Number)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 250, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1, (user) => user.userCreated, {
        nullable: true,
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    (0, typeorm_1.JoinColumn)({
        foreignKeyConstraintName: 'Users_fk_1',
        name: 'createdBy',
        referencedColumnName: 'guid'
    }),
    __metadata("design:type", User)
], User.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1, (user) => user.userUpdated, {
        nullable: true,
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    (0, typeorm_1.JoinColumn)({
        foreignKeyConstraintName: 'Users_fk_2',
        name: 'updatedBy',
        referencedColumnName: 'guid'
    }),
    __metadata("design:type", User)
], User.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1, (user) => user.userDeleted, {
        nullable: true,
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    (0, typeorm_1.JoinColumn)({
        foreignKeyConstraintName: 'Users_fk_3',
        name: 'updatedBy',
        referencedColumnName: 'guid'
    }),
    __metadata("design:type", User)
], User.prototype, "deletedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => User_1, (user) => user.createdBy),
    __metadata("design:type", Array)
], User.prototype, "userCreated", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => User_1, (user) => user.updatedBy),
    __metadata("design:type", Array)
], User.prototype, "userUpdated", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => User_1, (user) => user.deletedBy),
    __metadata("design:type", Array)
], User.prototype, "userDeleted", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => category_entity_1.Category, (category) => category.users),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], User.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => paymentMethod_entity_1.PaymentMethod, (paymentMethod) => paymentMethod.users),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], User.prototype, "paymentMethod", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => organization_entity_1.Organization, (Organization) => Organization.users),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], User.prototype, "Organization", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 350, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "availability", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 550, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 3250, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "previusWorks", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 3250, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "certifications", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', nullable: false, default: '1' }),
    __metadata("design:type", Number)
], User.prototype, "isAvailable", void 0);
exports.User = User = User_1 = __decorate([
    (0, typeorm_1.Entity)({ name: 'Users' }),
    (0, typeorm_1.Unique)('Users_uk', ['username'])
], User);
//# sourceMappingURL=users.entity.js.map