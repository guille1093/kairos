import { ConfigService } from '@nestjs/config';
import { JWTPayloadInterface } from 'src/app/api.interface';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userService;
    private readonly config;
    private logger;
    constructor(config: ConfigService);
    validate(payload: JWTPayloadInterface): Promise<any>;
}
export {};
