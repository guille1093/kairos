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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const users_service_1 = require("../users/users.service");
const users_exception_1 = require("../users/users.exception");
let AuthService = exports.AuthService = class AuthService {
    async validateUser(params) {
        const user = await this.userService.getBy({
            query: { username: params.username },
            withPassword: true
        });
        if (user && (await bcrypt.compare(params.password, user.password))) {
            user.password = undefined;
            return user;
        }
        throw new users_exception_1.UsernamePasswordNoExistsException();
    }
    async validateGoogleUser(params) {
        console.log('Validating Google User');
        try {
            const user = await this.userService.getBy({
                query: { email: params.email }
            });
            const file = null;
            const updatedUser = await this.userService.update(file, {
                guid: user.guid,
                body: {
                    googleID: params.googleID,
                    roleGuid: user.role.guid
                },
                updatedByGUID: user.guid
            });
            console.log('User updated');
            const response = updatedUser;
            console.log('User response', response);
            return updatedUser;
        }
        catch (error) {
            console.log('User does not exist, creating new user...');
            const file = null;
            const newUser = await this.userService.create(file, {
                body: {
                    password: '',
                    name: params.name,
                    lastname: params.lastname,
                    email: params.email,
                    username: params.email,
                    googleID: params.googleID,
                    roleGuid: 'R02',
                    document: '',
                    phone: '',
                    address: '',
                    birthdate: undefined,
                    profileImage: '',
                    documentSideA: '',
                    documentSideB: '',
                    backgroundCheck: '',
                    category: '[]',
                    paymentMethods: '[]',
                    backgroundCheckExpirationDate: undefined,
                    mapAdress: '',
                    backgroundCheckDate: undefined
                }
            });
            return newUser;
        }
    }
    async generateAccessToken(params) {
        const payload = {
            guid: params.user.guid,
            role: params.user.role.guid,
            username: params.user.username
        };
        console.log('Payload', payload);
        console.log('User', params.user);
        return {
            token: this.jwtService.sign(payload),
            user: params.user
        };
    }
    async validateAccessToken(params) {
        return this.jwtService.verify(params.token);
    }
};
__decorate([
    (0, common_1.Inject)(users_service_1.UsersService),
    __metadata("design:type", users_service_1.UsersService)
], AuthService.prototype, "userService", void 0);
__decorate([
    (0, common_1.Inject)(jwt_1.JwtService),
    __metadata("design:type", jwt_1.JwtService)
], AuthService.prototype, "jwtService", void 0);
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
//# sourceMappingURL=auth.service.js.map