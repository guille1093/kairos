"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = require("helmet");
const path_1 = require("path");
const app_module_1 = require("./app/app.module");
const LOGGER = new common_1.Logger('API');
if (!process.env.TZ) {
    LOGGER.error('Enviroment TZ is necessary');
    process.exit(0);
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: process.env.NODE_ENV === 'development' ? ['log', 'debug', 'error', 'verbose', 'warn'] : ['log', 'error', 'warn']
    });
    const config = app.get(config_1.ConfigService);
    const envBasePath = config.get('BASEPATH');
    const basepath = envBasePath && envBasePath.length > 1
        ? envBasePath.charAt(envBasePath.length - 1) === '/'
            ? envBasePath.substring(0, envBasePath.length - 1)
            : envBasePath
        : '';
    if (basepath !== '') {
        app.setGlobalPrefix(basepath);
    }
    app.use((0, helmet_1.default)());
    let configCORS = { origin: ['*'], methods: 'GET,PUT,PATCH,POST,DELETE,OPTIONS' };
    switch (process.env.NODE_ENV) {
        case 'development':
            configCORS.origin = ['http://localhost:3001', config.get('FRONT_URL')];
            break;
        case 'production':
            configCORS.origin = [config.get('FRONT_URL')];
            break;
    }
    app.enableCors(configCORS);
    let swaggerPath = '';
    if (process.env.SWAGGER_DOCS && process.env.SWAGGER_DOCS === '1') {
        const configSwagger = new swagger_1.DocumentBuilder()
            .setTitle(config.get('DESCRIPTION'))
            .setVersion('1.0')
            .addApiKey({
            type: 'apiKey',
            name: 'x-api-key',
            in: 'header',
            description: 'API Key For External calls'
        })
            .addBearerAuth({
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
            description: 'JWT Token use Bearer'
        })
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, configSwagger);
        swaggerPath = `${basepath}${basepath !== '' ? '/' : ''}api-docs`;
        swagger_1.SwaggerModule.setup(swaggerPath, app, document);
    }
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    app.useStaticAssets((0, path_1.join)(__dirname, '..', '..', 'files'), {
        index: false,
        prefix: '/files'
    });
    await app.listen(config.get('PORT'));
    LOGGER.log(`API Time Zone - ${config.get('TZ')}`);
    LOGGER.log(`API Started - ${await app.getUrl()}/${basepath}`);
    LOGGER.log(`Swagger Docs - ${await app.getUrl()}/${basepath}${basepath !== '' ? '/' : ''}api-docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map