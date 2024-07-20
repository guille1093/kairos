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
var UsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const defatul_service_1 = require("../app/defaults/defatul.service");
const role_enum_1 = require("../roles/role.enum");
const roles_entity_1 = require("../roles/roles.entity");
const users_entity_1 = require("./users.entity");
const users_exception_1 = require("./users.exception");
const category_entity_1 = require("../categories/entities/category.entity");
const paymentMethod_entity_1 = require("../paymentMethod/entities/paymentMethod.entity");
const typeorm_2 = require("typeorm");
const filePersistor_1 = require("../app/utils/filePersistor");
let UsersService = exports.UsersService = UsersService_1 = class UsersService extends defatul_service_1.DefaultService {
    constructor() {
        super(UsersService_1);
    }
    async _hashPassword(password) {
        const salt = await bcrypt.genSalt(8);
        return await bcrypt.hash(password, salt);
    }
    async getBy(params) {
        try {
            const user = await this.userRepository.findOne({
                select: {
                    guid: true,
                    name: true,
                    lastname: true,
                    document: true,
                    email: true,
                    profileImage: true,
                    username: true,
                    documentSideA: true,
                    documentSideB: true,
                    backgroundCheck: true,
                    backgroundCheckDate: true,
                    backgroundCheckExpirationDate: true,
                    birthdate: true,
                    address: true,
                    phone: true,
                    mapAdress: true,
                    isActive: true,
                    googleID: true,
                    createdAt: true,
                    updatedAt: true,
                    availability: true,
                    isAvailable: true,
                    certifications: true,
                    previusWorks: true,
                    description: true,
                    category: {
                        guid: true,
                        name: true,
                        description: true
                    },
                    paymentMethod: {
                        guid: true,
                        name: true
                    },
                    password: params.withPassword || false,
                    createdBy: {
                        guid: true,
                        name: true,
                        lastname: true,
                        email: true,
                        username: true,
                        createdAt: true,
                        updatedAt: true,
                        password: false
                    }
                },
                relations: ['role', 'createdBy', 'updatedBy', 'deletedBy', 'category', 'paymentMethod'],
                where: {
                    guid: params.query.guid || undefined,
                    username: params.query.username || undefined,
                    googleID: params.query.googleID || undefined,
                    email: params.query.email || undefined,
                    document: params.query.document || undefined,
                    isActive: params.query.isActive || undefined,
                    deletedAt: (0, typeorm_2.IsNull)()
                }
            });
            if (!user)
                throw new users_exception_1.UserNoExistsException();
            user.availability = JSON.parse(user.availability);
            user.certifications = JSON.parse(user.certifications);
            user.previusWorks = JSON.parse(user.previusWorks);
            return user;
        }
        catch (error) {
            throw new Error(`${UsersService_1.name}[getBy]:${error.message}`);
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
            let categoriesIDs = [];
            if (params.query.categoryID) {
                categoriesIDs = await Promise.all(params.query.categoryID
                    .trim()
                    .substring(1, params.query.categoryID.length - 1)
                    .split(',')
                    .map((jobType) => jobType.trim())
                    .map(async (categoryId) => {
                    const category = await this.categoryRepository.findOneBy({
                        guid: categoryId
                    });
                    if (!category) {
                        throw new Error('Category not found');
                    }
                    return category;
                }));
            }
            const forPage = parseInt(params.query.pageSize);
            const skip = parseInt(params.query.offset);
            const [user, total] = await this.userRepository.findAndCount({
                select: {
                    guid: true,
                    name: true,
                    lastname: true,
                    email: true,
                    document: true,
                    profileImage: true,
                    documentSideA: true,
                    documentSideB: true,
                    backgroundCheck: true,
                    backgroundCheckDate: true,
                    backgroundCheckExpirationDate: true,
                    username: true,
                    birthdate: true,
                    address: true,
                    phone: true,
                    mapAdress: true,
                    availability: true,
                    isActive: true,
                    googleID: true,
                    createdAt: true,
                    updatedAt: true,
                    paymentMethod: true,
                    isAvailable: true,
                    certifications: true,
                    previusWorks: true,
                    description: true,
                    category: {
                        guid: true,
                        name: true,
                        description: true
                    },
                    role: {
                        guid: true,
                        role: true,
                        description: true
                    },
                    createdBy: {
                        guid: true,
                        name: true,
                        lastname: true,
                        email: true,
                        username: true,
                        createdAt: true,
                        updatedAt: true,
                        password: false
                    }
                },
                relations: ['role', 'createdBy', 'updatedBy', 'deletedBy', 'category', 'paymentMethod'],
                where: {
                    deletedAt: (0, typeorm_2.IsNull)(),
                    name: params.query.name ? (0, typeorm_2.Like)(`%${params.query.name}%`) : undefined,
                    lastname: params.query.lastname ? (0, typeorm_2.Like)(`%${params.query.lastname}%`) : undefined,
                    email: params.query.email ? (0, typeorm_2.Like)(`%${params.query.email}%`) : undefined,
                    document: params.query.document ? (0, typeorm_2.Like)(`%${params.query.document}%`) : undefined,
                    username: params.query.username ? (0, typeorm_2.Like)(`%${params.query.username}%`) : undefined,
                    isActive: params.query.isActive || undefined,
                    mapAdress: params.query.mapAdress || undefined,
                    phone: params.query.phone || undefined,
                    role: {
                        guid: params.query.roleGuid || undefined
                    },
                    category: {
                        guid: categoriesIDs.length > 0 ? (0, typeorm_2.In)(categoriesIDs.map((category) => category.guid)) : undefined,
                        name: params.query.category ? (0, typeorm_2.Like)(`%${params.query.category}%`) : undefined
                    },
                    paymentMethod: {
                        guid: params.query.paymentMethod || undefined
                    }
                },
                order,
                take: forPage,
                skip: skip
            });
            user.forEach((user) => {
                user.availability = JSON.parse(user.availability);
                user.certifications = JSON.parse(user.certifications);
                user.previusWorks = JSON.parse(user.previusWorks);
            });
            return {
                total: total,
                pageSize: forPage,
                offset: parseInt(params.query.offset),
                results: user
            };
        }
        catch (error) {
            throw new Error(`${UsersService_1.name}[all]:${error.message}`);
        }
    }
    async create(files, params) {
        try {
            (0, filePersistor_1.saveFiles)(files);
            let user = await this.userRepository.findOneBy({
                username: params.body.username
            });
            if (user) {
                throw new users_exception_1.UserAlreadyExistsException();
            }
            const hashedPassword = await this._hashPassword(params.body.password);
            let categories = [];
            if (params.body.category) {
                categories = await Promise.all(params.body.category
                    .trim()
                    .substring(1, params.body.category.length - 1)
                    .split(',')
                    .map((jobType) => jobType.trim())
                    .map(async (categoryId) => {
                    const category = await this.categoryRepository.findOneBy({
                        guid: categoryId
                    });
                    if (!category) {
                        throw new Error('Category not found');
                    }
                    return category;
                }));
            }
            if (!params.body.roleGuid) {
                params.body.roleGuid = 'R02';
            }
            user = await this.userRepository.save({
                name: params.body.name,
                lastname: params.body.lastname,
                email: params.body.email,
                document: params.body.document || null,
                password: hashedPassword,
                googleID: params.body.googleID || null,
                username: params.body.username,
                birthdate: params.body.birthdate || null,
                address: params.body.address || null,
                mapAdress: params.body.mapAdress || null,
                phone: params.body.phone || null,
                profileImage: files?.profileImage?.[0]?.filename || '',
                documentSideA: files?.documentSideA?.[0]?.filename || '',
                documentSideB: files?.documentSideB?.[0]?.filename || '',
                backgroundCheck: files?.backgroundCheck?.[0]?.filename || '',
                backgroundCheckDate: params.body.backgroundCheckDate || null,
                backgroundCheckExpirationDate: params.body.backgroundCheckExpirationDate || null,
                certifications: JSON.stringify(files?.certifications?.map((certification) => certification.filename)) || null,
                previusWorks: JSON.stringify(files?.previusWorks?.map((previusWork) => previusWork.filename)) || null,
                description: params.body.description || null,
                isAvailable: params.body.isAvailable || 0,
                availability: JSON.stringify(params.body.availability) || null,
                paymentMethods: params.body.paymentMethods || null,
                category: categories || [],
                role: await this.userRoleRepository.findOneBy({
                    guid: params.body.roleGuid
                }),
                isActive: params.body.isActive || 1,
                isProfessional: 0
            });
            user.createdBy = (await this.userRepository.findOneBy({ guid: params.createdByGUID })) || user;
            delete user.createdBy;
            user.certifications = JSON.parse(user.certifications);
            user.previusWorks = JSON.parse(user.previusWorks);
            return user;
        }
        catch (error) {
            throw new Error(`${UsersService_1.name}[create]:${error.message}`);
        }
    }
    async update(files, params) {
        try {
            (0, filePersistor_1.saveFiles)(files);
            const user = await this.userRepository.findOne({
                select: {
                    paymentMethod: {
                        guid: true,
                        name: true
                    }
                },
                where: { guid: params.guid, deletedAt: (0, typeorm_2.IsNull)() },
                relations: ['role', 'createdBy', 'updatedBy', 'deletedBy', 'category', 'paymentMethod']
            });
            if (!user) {
                throw new users_exception_1.UserNoExistsException();
            }
            if (files?.documentSideA && files?.documentSideB && !params.body.isProfessional) {
                params.body.roleGuid = role_enum_1.RoleEnum.ServiceProvier;
            }
            let categories = [];
            if (params.body.category) {
                categories = await Promise.all(params.body.category
                    .trim()
                    .substring(1, params.body.category.length - 1)
                    .split(',')
                    .map((jobType) => jobType.trim())
                    .map(async (categoryId) => {
                    const category = await this.categoryRepository.findOneBy({
                        guid: categoryId
                    });
                    if (!category) {
                        throw new Error('Category not found');
                    }
                    return category;
                }));
            }
            else {
                categories = user.category;
            }
            let paymentMethods = [];
            if (params.body.paymentMethods) {
                paymentMethods = await Promise.all(params.body.paymentMethods
                    .trim()
                    .substring(1, params.body.paymentMethods.length - 1)
                    .split(',')
                    .map((paymentMethod) => paymentMethod.trim())
                    .map(async (paymentMethodId) => {
                    const paymentMethod = await this.paymentMethodRepository.findOneBy({
                        guid: paymentMethodId
                    });
                    if (!paymentMethod) {
                        throw new Error('Payment Method not found');
                    }
                    return paymentMethod;
                }));
            }
            else {
                paymentMethods = user.paymentMethod;
                console.log('payment from service', user.paymentMethod);
            }
            user.name = params.body.name || user.name;
            user.email = params.body.email || user.email;
            user.address = params.body.address || user.address;
            user.phone = params.body.phone || user.phone;
            user.googleID = params.body.googleID || user.googleID;
            user.birthdate = params.body.birthdate || user.birthdate;
            user.profileImage = files?.profileImage?.[0]?.filename || user.profileImage;
            user.documentSideA = files?.documentSideA?.[0]?.filename || user.documentSideA;
            user.documentSideB = files?.documentSideB?.[0]?.filename || user.documentSideB;
            user.backgroundCheck = files?.backgroundCheck?.[0]?.filename || user.backgroundCheck;
            user.backgroundCheckExpirationDate = params.body.backgroundCheckExpirationDate || user.backgroundCheckExpirationDate;
            user.backgroundCheckDate = params.body.backgroundCheckDate || user.backgroundCheckDate;
            user.lastname = params.body.lastname || user.lastname;
            user.username = params.body.username || user.username;
            user.document = params.body.document || user.document;
            user.mapAdress = params.body.mapAdress || user.mapAdress;
            user.category = categories || user.category;
            user.backgroundCheckDate = params.body.backgroundCheckDate || user.backgroundCheckDate;
            user.password = params.body.password ? await this._hashPassword(params.body.password) : user.password;
            user.isActive = params.body.isActive !== undefined ? params.body.isActive : user.isActive;
            user.isAvailable = params.body.isAvailable !== undefined ? params.body.isAvailable : user.isAvailable;
            user.availability = JSON.stringify(params.body.availability) || user.availability;
            user.paymentMethod = paymentMethods || user.paymentMethod;
            user.certifications = JSON.stringify(files?.certifications?.map((certification) => certification.filename)) || user.certifications;
            user.previusWorks = JSON.stringify(files?.previusWorks?.map((previusWork) => previusWork.filename)) || user.previusWorks;
            user.description = params.body.description || user.description;
            if (params.body.roleGuid !== undefined) {
                user.role = await this.userRoleRepository.findOneBy({
                    guid: params.body.roleGuid
                });
            }
            let newUser = await this.userRepository.save(user);
            newUser.availability = JSON.parse(newUser.availability);
            newUser.certifications = newUser.certifications ? JSON.parse(newUser.certifications) : [];
            newUser.previusWorks = newUser.previusWorks ? JSON.parse(newUser.previusWorks) : [];
            return newUser;
        }
        catch (error) {
            throw new Error(`${UsersService_1.name}[update]:${error.message}`);
        }
    }
    async delete(params) {
        try {
            const userToDelete = await this.userRepository.findOne({
                where: { guid: params.guid, deletedAt: (0, typeorm_2.IsNull)() }
            });
            if (!userToDelete) {
                throw new users_exception_1.UserNoExistsException();
            }
            const user = await this.userRepository.findOne({
                where: { guid: params.updatedByGUID }
            });
            if (!user) {
                throw new Error('UserNoExists');
            }
            userToDelete.deletedAt = new Date();
            userToDelete.updatedBy = user;
            userToDelete.isActive = 0;
            return await this.userRepository.save(userToDelete);
        }
        catch (error) {
            throw new Error(`${UsersService_1.name}[delete]:${error.message}`);
        }
    }
};
__decorate([
    (0, typeorm_1.InjectRepository)(users_entity_1.User),
    __metadata("design:type", typeorm_2.Repository)
], UsersService.prototype, "userRepository", void 0);
__decorate([
    (0, typeorm_1.InjectRepository)(roles_entity_1.Role),
    __metadata("design:type", typeorm_2.Repository)
], UsersService.prototype, "userRoleRepository", void 0);
__decorate([
    (0, typeorm_1.InjectRepository)(category_entity_1.Category),
    __metadata("design:type", typeorm_2.Repository)
], UsersService.prototype, "categoryRepository", void 0);
__decorate([
    (0, typeorm_1.InjectRepository)(paymentMethod_entity_1.PaymentMethod),
    __metadata("design:type", typeorm_2.Repository)
], UsersService.prototype, "paymentMethodRepository", void 0);
exports.UsersService = UsersService = UsersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UsersService);
//# sourceMappingURL=users.service.js.map