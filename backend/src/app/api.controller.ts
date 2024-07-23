import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Inject, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DefaultWithoutSecurityController } from 'src/app/defaults/default.without-security.controller';
import { ResposeDTO, ResposeSuccessDataDTO } from 'src/app/api.dto';
import { LoginDTO, googleOAuthDTO } from 'src/users/users.dto';
import { AuthService } from 'src/auth/auth.service';
import { ApiService } from './api.service';

@Controller()
@ApiTags('API')
export class ApiController extends DefaultWithoutSecurityController {
  @Inject(ApiService)
  private readonly apiService: ApiService;
  @Inject(AuthService)
  private readonly authService: AuthService;

  constructor() {
    super(ApiController);
  }

  @Get()
  @ApiOperation({ summary: 'API description and version' })
  getInfo(): any {
    return this.apiService.getInfo();
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: ResposeSuccessDataDTO, status: HttpStatus.OK })
  @ApiResponse({ type: ResposeDTO, status: HttpStatus.INTERNAL_SERVER_ERROR })
  @ApiResponse({ type: ResposeDTO, status: HttpStatus.NOT_FOUND })
  async login(@Body() body: LoginDTO): Promise<ResposeSuccessDataDTO> {
    try {
      const user = await this.authService.validateUser({
        username: body.username,
        password: body.password
      });
      const token = await this.authService.generateAccessToken({ user });
      console.log(token);
      return { status: 'success', data: token };
    } catch (error) {
      this.logger.error(error.message ?? error);
      throw new HttpException(
        {
          status: 'error',
          message: `${ApiController.name}-${error.message ?? error}`
        },
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('googleoauth')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: ResposeSuccessDataDTO, status: HttpStatus.OK })
  @ApiResponse({ type: ResposeDTO, status: HttpStatus.INTERNAL_SERVER_ERROR })
  @ApiResponse({ type: ResposeDTO, status: HttpStatus.NOT_FOUND })
  async googleoauth(@Body() body: googleOAuthDTO): Promise<ResposeSuccessDataDTO> {
    try {
      const user = await this.authService.validateGoogleUser({
        name: body.name,
        lastname: body.lastname,
        email: body.email,
        googleID: body.googleID
      });
      const token = await this.authService.generateAccessToken({ user });
      console.log(token);
      return { status: 'success', data: token };
    } catch (error) {
      this.logger.error(error.message ?? error);
      throw new HttpException(
        {
          status: 'error',
          message: `${ApiController.name}-${error.message ?? error}`
        },
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
