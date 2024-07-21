"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesModule = void 0;
const common_1 = require("@nestjs/common");
const categories_service_1 = require("./categories.service");
const categories_controller_1 = require("./categories.controller");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("../users/users.entity");
const category_entity_1 = require("./entities/category.entity");
let CategoriesModule = exports.CategoriesModule = class CategoriesModule {
};
exports.CategoriesModule = CategoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule, typeorm_1.TypeOrmModule.forFeature([users_entity_1.User, category_entity_1.Category])],
        controllers: [categories_controller_1.CategoriesController],
        providers: [categories_service_1.CategoriesService],
        exports: [categories_service_1.CategoriesService],
    })
], CategoriesModule);
//# sourceMappingURL=categories.module.js.map