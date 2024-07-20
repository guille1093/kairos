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
var UtilsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const moment = require("moment");
let UtilsService = exports.UtilsService = UtilsService_1 = class UtilsService {
    getTimezone() {
        const d = new Date().toString();
        return (d
            .substring(d.search('GMT'), d.length)
            .split(' ')[0]
            .split('GMT')[1]
            .substring(0, 3) +
            ':' +
            d
                .substring(d.search('GMT'), d.length)
                .split(' ')[0]
                .split('GMT')[1]
                .substring(3));
    }
    getYYYYMMDDDateFormat(date, includeTime = true) {
        try {
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            return `${date.getFullYear()}-${month}-${day}${includeTime
                ? ` ${date.getUTCHours()}:${date.getMinutes()}:${date.getSeconds()}`
                : ''}`;
        }
        catch (error) {
            throw new Error(`${UtilsService_1.name}(getYYYYMMDDDateFormat): ${error.message}`);
        }
    }
    isValidDate(dateString) {
        const date = moment(dateString, 'YYYY-MM-DD', true);
        return date.isValid();
    }
    clearUrlPath(url) {
        return url.charAt(url.length - 1) === '/'
            ? url.substring(0, url.length - 1)
            : url;
    }
    basePath() {
        const envBasePath = this.config.get('BASEPATH');
        return envBasePath && envBasePath.length > 1
            ? envBasePath.charAt(envBasePath.length - 1) === '/'
                ? envBasePath.substring(0, envBasePath.length - 1)
                : envBasePath
            : '';
    }
};
__decorate([
    (0, common_1.Inject)(config_1.ConfigService),
    __metadata("design:type", config_1.ConfigService)
], UtilsService.prototype, "config", void 0);
exports.UtilsService = UtilsService = UtilsService_1 = __decorate([
    (0, common_1.Injectable)()
], UtilsService);
//# sourceMappingURL=utils.service.js.map