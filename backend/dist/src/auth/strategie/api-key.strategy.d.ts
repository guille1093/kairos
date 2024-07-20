import { Request } from 'express';
import Strategy from 'passport-headerapikey';
declare const ApiKeyStrategy_base: new (...args: any[]) => Strategy;
export declare class ApiKeyStrategy extends ApiKeyStrategy_base {
    private readonly config;
    private readonly logger;
    constructor();
    validate: (apiKey: string, done: (error: Error, data: any) => any, request: Request) => any;
}
export {};
