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
var OrganizationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const defatul_service_1 = require("../app/defaults/defatul.service");
const typeorm_2 = require("typeorm");
const organization_entity_1 = require("./entities/organization.entity");
const organization_exeptions_1 = require("./organization.exeptions");
let OrganizationService = exports.OrganizationService = OrganizationService_1 = class OrganizationService extends defatul_service_1.DefaultService {
    constructor() {
        super(OrganizationService_1);
    }
    async getBy(params) {
        try {
            const Organization = await this.OrganizationRepository.findOne({
                select: {
                    guid: true,
                    name: true,
                    description: true,
                    createdAt: true,
                    updatedAt: true,
                    isActive: true,
                    createdBy: {
                        guid: true,
                        name: true,
                        lastname: true,
                        email: true,
                        createdAt: true,
                        updatedAt: true,
                        password: false
                    }
                },
                relations: ['createdBy', 'updatedBy', 'deletedBy'],
                where: {
                    guid: params.query.guid || undefined,
                    name: params.query.name || undefined,
                    isActive: params.query.isActive || undefined,
                    deletedAt: (0, typeorm_2.IsNull)()
                }
            });
            return Organization;
        }
        catch (error) {
            throw new Error(`${OrganizationService_1.name}[getBy]:${error.message}`);
        }
    }
    async all(params) {
        const emptyResponse = {
            total: 0,
            pageSize: 0,
            offset: params.query.offset,
            results: []
        };
        try {
            if (Object.keys(params.query).length === 0) {
                return emptyResponse;
            }
            if (params.query.pageSize?.toString() === '0') {
                return emptyResponse;
            }
            const order = {};
            if (params.query.orderBy && params.query.orderType) {
                order[params.query.orderBy] = params.query.orderType;
            }
            const forPage = parseInt(params.query.pageSize);
            const skip = parseInt(params.query.offset);
            const [Organization, total] = await this.OrganizationRepository.findAndCount({
                select: {
                    guid: true,
                    name: true,
                    description: true,
                    createdAt: true,
                    updatedAt: true,
                    isActive: true,
                    createdBy: {
                        guid: true,
                        name: true,
                        lastname: true,
                        email: true,
                        createdAt: true,
                        updatedAt: true,
                        password: false
                    }
                },
                relations: ['createdBy', 'updatedBy'],
                where: {
                    deletedAt: (0, typeorm_2.IsNull)(),
                    name: params.query.name ? (0, typeorm_2.Like)(`%${params.query.name}%`) : undefined,
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
                results: Organization
            };
        }
        catch (error) {
            throw new Error(`${OrganizationService_1.name}[all]:${error.message}`);
        }
    }
    async create(params) {
        try {
            const findOrganization = await this.OrganizationRepository.findOne({
                where: { name: params.body.name, deletedAt: (0, typeorm_2.IsNull)() }
            });
            if (findOrganization) {
                return findOrganization;
            }
            const Organization = await this.OrganizationRepository.save({
                name: params.body.name,
                description: params.body.description || null,
                isActive: params.body.isActive || 1,
                createdBy: { guid: params.createdByGUID }
            });
            return Organization;
        }
        catch (error) {
            throw new Error(`${OrganizationService_1.name}[create]:${error.message}`);
        }
    }
    async update(params) {
        try {
            const Organization = await this.OrganizationRepository.findOne({
                where: { guid: params.guid, deletedAt: (0, typeorm_2.IsNull)() }
            });
            if (!Organization) {
                throw new organization_exeptions_1.OrganizationNoExistsException();
            }
            Organization.name = params.body.name || Organization.name;
            Organization.description = params.body.description || Organization.description;
            Organization.isActive = params.body.isActive !== undefined ? params.body.isActive : Organization.isActive;
            return await this.OrganizationRepository.save(Organization);
        }
        catch (error) {
            throw new Error(`${OrganizationService_1.name}[update]:${error.message}`);
        }
    }
};
__decorate([
    (0, typeorm_1.InjectRepository)(organization_entity_1.Organization),
    __metadata("design:type", typeorm_2.Repository)
], OrganizationService.prototype, "OrganizationRepository", void 0);
exports.OrganizationService = OrganizationService = OrganizationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], OrganizationService);
//# sourceMappingURL=organization.service.js.map