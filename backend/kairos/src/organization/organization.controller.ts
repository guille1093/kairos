import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Inject, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, DefaultController } from '../app/defaults/default.controller';
import { ResposeDTO, ResposeSuccessDataDTO, ResposeSuccessPaginationDTO } from '../app/api.dto';
import { RoleEnum } from '../roles/role.enum';
import { OrganizationService } from './organization.service';
import { User } from '../users/users.entity';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { Organization } from './entities/organization.entity';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Controller('Organization')
@ApiTags('Organization')
export class OrganizationController extends DefaultController {
  @Inject(OrganizationService)
  private readonly OrganizationService: OrganizationService;

  constructor() {
    super(OrganizationController);
  }

  @Get()
  //@Auth(RoleEnum.Super, RoleEnum.ServiceProvier, RoleEnum.Client, RoleEnum.Moderator)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all Organization' })
  @ApiResponse({ type: ResposeSuccessPaginationDTO, status: HttpStatus.OK })
  async all(@Query() query: any): Promise<ResposeSuccessPaginationDTO> {
    try {
      return {
        status: 'success',
        data: await this.OrganizationService.all({ query: query })
      };
    } catch (error) {
      this.logger.error(error.message ?? error);
      throw new HttpException(
        {
          status: 'error',
          message: `${OrganizationController.name}-${error.message ?? error}`
        },
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':guid')
  //@Auth(RoleEnum.Super, RoleEnum.ServiceProvier, RoleEnum.Client, RoleEnum.Moderator)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get one Organization by guid' })
  @ApiResponse({ type: ResposeSuccessDataDTO, status: HttpStatus.OK })
  @ApiResponse({ type: ResposeDTO, status: HttpStatus.NOT_FOUND })
  async findOne(@Param('guid') guid: string): Promise<ResposeSuccessDataDTO> {
    try {
      const Organization = await this.OrganizationService.getBy({
        query: { guid: guid }
      });
      return { status: 'success', data: Organization };
    } catch (error) {
      this.logger.error(error.message ?? error);
      throw new HttpException(
        {
          status: 'error',
          message: `${OrganizationController.name}-${error.message ?? error}`
        },
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post()
  //@Auth(RoleEnum.Super, RoleEnum.ServiceProvier, RoleEnum.Client, RoleEnum.Moderator)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create Organization' })
  @ApiResponse({ type: ResposeSuccessDataDTO, status: HttpStatus.CREATED })
  @ApiResponse({ type: ResposeDTO, status: HttpStatus.CONFLICT })
  async create(@Body() body: CreateOrganizationDto, @Req() request: { user: User }): Promise<any> {
    try {
      const Organization: Organization = await this.OrganizationService.create({
        body: body,
        createdByGUID: null
      });
      return { status: 'success', data: Organization };
    } catch (error) {
      this.logger.error(error.message ?? error);
      throw new HttpException(
        {
          status: 'error',
          message: `${OrganizationController.name}-${error.message ?? error}`
        },
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Patch(':guid')
  //@Auth(RoleEnum.Super, RoleEnum.ServiceProvier, RoleEnum.Client, RoleEnum.Moderator)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Organization' })
  @ApiResponse({ type: ResposeSuccessDataDTO, status: HttpStatus.OK })
  @ApiResponse({ type: ResposeDTO, status: HttpStatus.NOT_FOUND })
  async update(@Param('guid') guid: string, @Body() body: UpdateOrganizationDto, @Req() request: { user: User }): Promise<ResposeSuccessDataDTO> {
    try {
      const updatedOrganization = await this.OrganizationService.update({
        guid: guid,
        body: body,
        updatedByGUID: request.user.guid
      });
      return { status: 'success', data: updatedOrganization };
    } catch (error) {
      this.logger.error(error.message ?? error);
      throw new HttpException(
        {
          status: 'error',
          message: `${OrganizationController.name}-${error.message ?? error}`
        },
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
