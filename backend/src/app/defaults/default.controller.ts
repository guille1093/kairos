import { HttpStatus, Logger, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../../roles/decorators/roles.decorator';
import { ResposeDTO } from '../api.dto';
import { RoleEnum } from '../../roles/role.enum';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../../auth/guard/roles.guard';
export const Auth = (...roles: RoleEnum[]) =>
  applyDecorators(
    UseGuards(JwtAuthGuard),
    Roles(...roles),
    UseGuards(RolesGuard),
  );

@ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@ApiResponse({ type: ResposeDTO, status: HttpStatus.INTERNAL_SERVER_ERROR })
export class DefaultController {
  public logger: Logger;

  constructor(private object) {
    this.logger = new Logger(this.object.name);
  }
}
