import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Inject, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, DefaultController } from '../app/defaults/default.controller';
import { ResposeDTO, ResposeSuccessDataDTO, ResposeSuccessPaginationDTO } from '../app/api.dto';
import { RoleEnum } from '../roles/role.enum';
import { NotificationService } from './notification.service';
import { User } from '../users/users.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './entities/notification.entity';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Controller('Notification')
@ApiTags('Notification')
export class NotificationController extends DefaultController {
  @Inject(NotificationService)
  private readonly NotificationService: NotificationService;

  constructor() {
    super(NotificationController);
  }

  @Get()
  @Auth(RoleEnum.Super, RoleEnum.ServiceProvier, RoleEnum.Client, RoleEnum.Moderator)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all my notifications' })
  @ApiResponse({ type: ResposeSuccessPaginationDTO, status: HttpStatus.OK })
  async all(@Query() query: any, @Req() request: { user: User }): Promise<ResposeSuccessPaginationDTO> {
    try {
      query.offset = query.offset ? query.offset : 0;
      query.pageSize = query.pageSize ? query.pageSize : 20;
      query.createdBy = request.user.guid;
      return {
        status: 'success',
        data: await this.NotificationService.all({ query: query })
      };
    } catch (error) {
      this.logger.error(error.message ?? error);
      throw new HttpException(
        {
          status: 'error',
          message: `${NotificationController.name}-${error.message ?? error}`
        },
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':guid')
  @Auth(RoleEnum.Super, RoleEnum.ServiceProvier, RoleEnum.Client, RoleEnum.Moderator)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get one Notification by guid' })
  @ApiResponse({ type: ResposeSuccessDataDTO, status: HttpStatus.OK })
  @ApiResponse({ type: ResposeDTO, status: HttpStatus.NOT_FOUND })
  async findOne(@Param('guid') guid: string): Promise<ResposeSuccessDataDTO> {
    try {
      const Notification = await this.NotificationService.getBy({
        query: { guid: guid }
      });
      return { status: 'success', data: Notification };
    } catch (error) {
      this.logger.error(error.message ?? error);
      throw new HttpException(
        {
          status: 'error',
          message: `${NotificationController.name}-${error.message ?? error}`
        },
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post()
  @Auth(RoleEnum.Super, RoleEnum.ServiceProvier, RoleEnum.Client, RoleEnum.Moderator)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create Notification' })
  @ApiResponse({ type: ResposeSuccessDataDTO, status: HttpStatus.CREATED })
  @ApiResponse({ type: ResposeDTO, status: HttpStatus.CONFLICT })
  async create(@Body() body: CreateNotificationDto, @Req() request: { user: User }): Promise<any> {
    try {
      const Notification: Notification = await this.NotificationService.create({
        body: body,
        createdByGUID: request.user.guid
      });
      return { status: 'success', data: Notification };
    } catch (error) {
      this.logger.error(error.message ?? error);
      throw new HttpException(
        {
          status: 'error',
          message: `${NotificationController.name}-${error.message ?? error}`
        },
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Patch(':guid')
  @Auth(RoleEnum.Super, RoleEnum.ServiceProvier, RoleEnum.Client, RoleEnum.Moderator)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Notification' })
  @ApiResponse({ type: ResposeSuccessDataDTO, status: HttpStatus.OK })
  @ApiResponse({ type: ResposeDTO, status: HttpStatus.NOT_FOUND })
  async update(@Param('guid') guid: string, @Body() body: UpdateNotificationDto, @Req() request: { user: User }): Promise<ResposeSuccessDataDTO> {
    try {
      const updatedNotification = await this.NotificationService.update({
        guid: guid,
        body: body,
        updatedByGUID: request.user.guid
      });
      return { status: 'success', data: updatedNotification };
    } catch (error) {
      this.logger.error(error.message ?? error);
      throw new HttpException(
        {
          status: 'error',
          message: `${NotificationController.name}-${error.message ?? error}`
        },
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
