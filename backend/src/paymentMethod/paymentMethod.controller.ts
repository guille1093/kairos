import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Inject, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, DefaultController } from '../app/defaults/default.controller';
import { ResposeDTO, ResposeSuccessDataDTO, ResposeSuccessPaginationDTO } from '../app/api.dto';
import { RoleEnum } from '../roles/role.enum';
import { PaymentMethodService } from './paymentMethod.service';
import { User } from '../users/users.entity';
import { CreatePaymentMethodDto } from './dto/create-paymentMethod.dto';
import { PaymentMethod } from './entities/paymentMethod.entity';
import { UpdatePaymentMethodDto } from './dto/update-paymentMethod.dto';

@Controller('PaymentMethod')
@ApiTags('PaymentMethod')
export class PaymentMethodController extends DefaultController {
  @Inject(PaymentMethodService)
  private readonly PaymentMethodService: PaymentMethodService;

  constructor() {
    super(PaymentMethodController);
  }

  @Get()
  @Auth(RoleEnum.Super, RoleEnum.ServiceProvier, RoleEnum.Client, RoleEnum.Moderator)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all PaymentMethod' })
  @ApiResponse({ type: ResposeSuccessPaginationDTO, status: HttpStatus.OK })
  async all(@Query() query: any): Promise<ResposeSuccessPaginationDTO> {
    try {
      return {
        status: 'success',
        data: await this.PaymentMethodService.all({ query: query })
      };
    } catch (error) {
      this.logger.error(error.message ?? error);
      throw new HttpException(
        {
          status: 'error',
          message: `${PaymentMethodController.name}-${error.message ?? error}`
        },
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':guid')
  @Auth(RoleEnum.Super, RoleEnum.ServiceProvier, RoleEnum.Client, RoleEnum.Moderator)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get one PaymentMethod by guid' })
  @ApiResponse({ type: ResposeSuccessDataDTO, status: HttpStatus.OK })
  @ApiResponse({ type: ResposeDTO, status: HttpStatus.NOT_FOUND })
  async findOne(@Param('guid') guid: string): Promise<ResposeSuccessDataDTO> {
    try {
      const PaymentMethod = await this.PaymentMethodService.getBy({
        query: { guid: guid }
      });
      return { status: 'success', data: PaymentMethod };
    } catch (error) {
      this.logger.error(error.message ?? error);
      throw new HttpException(
        {
          status: 'error',
          message: `${PaymentMethodController.name}-${error.message ?? error}`
        },
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post()
  @Auth(RoleEnum.Super, RoleEnum.ServiceProvier, RoleEnum.Client, RoleEnum.Moderator)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create PaymentMethod' })
  @ApiResponse({ type: ResposeSuccessDataDTO, status: HttpStatus.CREATED })
  @ApiResponse({ type: ResposeDTO, status: HttpStatus.CONFLICT })
  async create(@Body() body: CreatePaymentMethodDto, @Req() request: { user: User }): Promise<any> {
    try {
      const PaymentMethod: PaymentMethod = await this.PaymentMethodService.create({
        body: body,
        createdByGUID: request.user.guid
      });
      return { status: 'success', data: PaymentMethod };
    } catch (error) {
      this.logger.error(error.message ?? error);
      throw new HttpException(
        {
          status: 'error',
          message: `${PaymentMethodController.name}-${error.message ?? error}`
        },
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Patch(':guid')
  @Auth(RoleEnum.Super, RoleEnum.ServiceProvier, RoleEnum.Client, RoleEnum.Moderator)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update PaymentMethod' })
  @ApiResponse({ type: ResposeSuccessDataDTO, status: HttpStatus.OK })
  @ApiResponse({ type: ResposeDTO, status: HttpStatus.NOT_FOUND })
  async update(@Param('guid') guid: string, @Body() body: UpdatePaymentMethodDto, @Req() request: { user: User }): Promise<ResposeSuccessDataDTO> {
    try {
      const updatedPaymentMethod = await this.PaymentMethodService.update({
        guid: guid,
        body: body,
        updatedByGUID: request.user.guid
      });
      return { status: 'success', data: updatedPaymentMethod };
    } catch (error) {
      this.logger.error(error.message ?? error);
      throw new HttpException(
        {
          status: 'error',
          message: `${PaymentMethodController.name}-${error.message ?? error}`
        },
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
