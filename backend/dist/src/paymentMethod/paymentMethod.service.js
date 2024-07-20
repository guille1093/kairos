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
var PaymentMethodService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const defatul_service_1 = require("../app/defaults/defatul.service");
const typeorm_2 = require("typeorm");
const paymentMethod_entity_1 = require("./entities/paymentMethod.entity");
const paymentMethod_exeptions_1 = require("./paymentMethod.exeptions");
let PaymentMethodService = exports.PaymentMethodService = PaymentMethodService_1 = class PaymentMethodService extends defatul_service_1.DefaultService {
    constructor() {
        super(PaymentMethodService_1);
    }
    async getBy(params) {
        try {
            const paymentMethod = await this.paymentMethodRepository.findOne({
                select: {
                    guid: true,
                    name: true,
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
            return paymentMethod;
        }
        catch (error) {
            throw new Error(`${PaymentMethodService_1.name}[getBy]:${error.message}`);
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
            const [paymentMethod, total] = await this.paymentMethodRepository.findAndCount({
                select: {
                    guid: true,
                    name: true,
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
                results: paymentMethod
            };
        }
        catch (error) {
            throw new Error(`${PaymentMethodService_1.name}[all]:${error.message}`);
        }
    }
    async create(params) {
        try {
            const findPaymentMethod = await this.paymentMethodRepository.findOne({
                where: { name: params.body.name, deletedAt: (0, typeorm_2.IsNull)() }
            });
            if (findPaymentMethod) {
                return findPaymentMethod;
            }
            const paymentMethod = await this.paymentMethodRepository.save({
                name: params.body.name,
                isActive: params.body.isActive || 1,
                createdBy: { guid: params.createdByGUID }
            });
            return paymentMethod;
        }
        catch (error) {
            throw new Error(`${PaymentMethodService_1.name}[create]:${error.message}`);
        }
    }
    async update(params) {
        try {
            const paymentMethod = await this.paymentMethodRepository.findOne({
                where: { guid: params.guid, deletedAt: (0, typeorm_2.IsNull)() }
            });
            if (!paymentMethod) {
                throw new paymentMethod_exeptions_1.PaymentMethodNoExistsException();
            }
            paymentMethod.name = params.body.name || paymentMethod.name;
            paymentMethod.isActive = params.body.isActive !== undefined ? params.body.isActive : paymentMethod.isActive;
            return await this.paymentMethodRepository.save(paymentMethod);
        }
        catch (error) {
            throw new Error(`${PaymentMethodService_1.name}[update]:${error.message}`);
        }
    }
};
__decorate([
    (0, typeorm_1.InjectRepository)(paymentMethod_entity_1.PaymentMethod),
    __metadata("design:type", typeorm_2.Repository)
], PaymentMethodService.prototype, "paymentMethodRepository", void 0);
exports.PaymentMethodService = PaymentMethodService = PaymentMethodService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PaymentMethodService);
//# sourceMappingURL=paymentMethod.service.js.map