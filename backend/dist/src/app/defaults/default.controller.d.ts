import { Logger } from '@nestjs/common';
import { RoleEnum } from '../../roles/role.enum';
export declare const Auth: (...roles: RoleEnum[]) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare class DefaultController {
    private object;
    logger: Logger;
    constructor(object: any);
}
