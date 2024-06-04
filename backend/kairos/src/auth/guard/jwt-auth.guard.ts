import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../../roles/decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  @Inject(Reflector)
  private readonly reflector: Reflector;
  private logger: Logger = new Logger('API');

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) return true;
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context) {
    const request = context.switchToHttp().getRequest();
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';
    const message = `${method} ${originalUrl} - ${userAgent} [${ip}]`;

    if (err || !user) {
      this.logger.error(
        `UNAUTHORIZED ${message}${err ? ` - ${err.message}` : ''}`,
      );
      throw new HttpException(
        {
          status: 'error',
          message:
            err && err.message
              ? err.message
              : 'Action not allowed. You must login.',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    this.logger.warn(`AUTHORIZED ${message}`);

    return user;
  }
}