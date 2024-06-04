import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResposeDTO, ResposeSuccessDataDTO, ResposeSuccessPaginationDTO } from 'src/app/api.dto';
import { Auth, DefaultController } from 'src/app/defaults/default.controller';
import { RoleEnum } from 'src/roles/role.enum';
import { CreateUserDTO, SearchUserPaginationDTO, UpdateUserDTO } from 'src/users/users.dto';
import { User } from 'src/users/users.entity';
import { Public } from '../roles/decorators/public.decorator';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController extends DefaultController {
  @Inject(UsersService)
  private readonly userService: UsersService;

  constructor() {
    super(UsersController);
  }

  @Get()
  @Auth(RoleEnum.Super, RoleEnum.ServiceProvier, RoleEnum.Client, RoleEnum.Moderator)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ type: ResposeSuccessPaginationDTO, status: HttpStatus.OK })
  async all(@Query() query: SearchUserPaginationDTO): Promise<ResposeSuccessPaginationDTO> {
    try {
      return {
        status: 'success',
        data: await this.userService.all({ query: query })
      };
    } catch (error) {
      this.logger.error(error.message ?? error);
      throw new HttpException(
        {
          status: 'error',
          message: `${UsersController.name}-${error.message ?? error}`
        },
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('providers')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all providers' })
  @ApiResponse({ type: ResposeSuccessPaginationDTO, status: HttpStatus.OK })
  async allProviders(@Query() query: SearchUserPaginationDTO): Promise<ResposeSuccessPaginationDTO> {
    query.isProfessional = 1;
    try {
      return {
        status: 'success',
        data: await this.userService.all({ query: query })
      };
    } catch (error) {
      this.logger.error(error.message ?? error);
      throw new HttpException(
        {
          status: 'error',
          message: `${UsersController.name}-${error.message ?? error}`
        },
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('homeProviders')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get homepage providers' })
  @ApiResponse({ type: ResposeSuccessPaginationDTO, status: HttpStatus.OK })
  async homeProviders(@Query() query: SearchUserPaginationDTO): Promise<ResposeSuccessPaginationDTO> {
    query.isProfessional = 1;
    query.pageSize = 8;
    query.offset = 0;
    try {
      return {
        status: 'success',
        data: await this.userService.all({ query: query })
      };
    } catch (error) {
      this.logger.error(error.message ?? error);
      throw new HttpException(
        {
          status: 'error',
          message: `${UsersController.name}-${error.message ?? error}`
        },
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('providers/:guid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get one provider by guid' })
  @ApiResponse({ type: ResposeSuccessDataDTO, status: HttpStatus.OK })
  @ApiResponse({ type: ResposeDTO, status: HttpStatus.NOT_FOUND })
  async findOneProvider(@Param('guid') guid: string): Promise<ResposeSuccessDataDTO> {
    try {
      const user = await this.userService.getBy({ query: { guid: guid, isProfessional: 1 } });
      return { status: 'success', data: user };
    } catch (error) {
      this.logger.error(error.message ?? error);
      throw new HttpException(
        {
          status: 'error',
          message: `${UsersController.name}-${error.message ?? error}`
        },
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('whoami')
  @Auth(RoleEnum.Super, RoleEnum.ServiceProvier, RoleEnum.Client, RoleEnum.Moderator)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Who am I' })
  @ApiResponse({ type: ResposeSuccessDataDTO, status: HttpStatus.OK })
  @ApiResponse({ type: ResposeDTO, status: HttpStatus.NOT_FOUND })
  async whoami(@Req() request: { user: User }): Promise<ResposeSuccessDataDTO> {
    try {
      const user = await this.userService.getBy({
        query: { guid: request.user.guid }
      });
      return { status: 'success', data: user };
    } catch (error) {
      this.logger.error(error.message ?? error);
      throw new HttpException(
        {
          status: 'error',
          message: `${UsersController.name}-${error.message ?? error}`
        },
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':guid')
  @Auth(RoleEnum.Super, RoleEnum.ServiceProvier, RoleEnum.Client, RoleEnum.Moderator)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get one user by guid' })
  @ApiResponse({ type: ResposeSuccessDataDTO, status: HttpStatus.OK })
  @ApiResponse({ type: ResposeDTO, status: HttpStatus.NOT_FOUND })
  async findOne(@Param('guid') guid: string): Promise<ResposeSuccessDataDTO> {
    try {
      const user = await this.userService.getBy({ query: { guid: guid } });
      return { status: 'success', data: user };
    } catch (error) {
      this.logger.error(error.message ?? error);
      throw new HttpException(
        {
          status: 'error',
          message: `${UsersController.name}-${error.message ?? error}`
        },
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post()
  @Auth(RoleEnum.Super, RoleEnum.ServiceProvier, RoleEnum.Client, RoleEnum.Moderator)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ type: ResposeSuccessDataDTO, status: HttpStatus.CREATED })
  @ApiResponse({ type: ResposeDTO, status: HttpStatus.CONFLICT })
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'profileImage', maxCount: 1 },
        { name: 'documentSideA', maxCount: 1 },
        { name: 'documentSideB', maxCount: 1 },
        { name: 'backgroundCheck', maxCount: 1 },
        { name: 'previusWorks', maxCount: 10 },
        { name: 'certifications', maxCount: 10 }
      ],

      {
        dest: './uploads/temp'
      }
    )
  )
  async create(
    @UploadedFiles()
    files: {
      profileImage?: Express.Multer.File;
      documentSideA?: Express.Multer.File;
      documentSideB?: Express.Multer.File;
      backgroundCheck?: Express.Multer.File;
      previusWorks?: Express.Multer.File[];
      certifications?: Express.Multer.File[];
    },
    @Body() body: CreateUserDTO,
    @Req() request: { user: User }
  ): Promise<any> {
    try {
      const user: User = await this.userService.create(files, {
        body: body,
        createdByGUID: request.user.guid
      });
      return { status: 'success', data: user };
    } catch (error) {
      this.logger.error(error.message ?? error);
      throw new HttpException(
        {
          status: 'error',
          message: `${UsersController.name}-${error.message ?? error}`
        },
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('signup')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'SignUp' })
  @ApiResponse({ type: ResposeSuccessDataDTO, status: HttpStatus.CREATED })
  @ApiResponse({ type: ResposeDTO, status: HttpStatus.CONFLICT })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'profileImage', maxCount: 1 },
        { name: 'documentSideA', maxCount: 1 },
        { name: 'documentSideB', maxCount: 1 },
        { name: 'backgroundCheck', maxCount: 1 },
        { name: 'previusWorks', maxCount: 10 },
        { name: 'certifications', maxCount: 10 }
      ],
      {
        dest: './uploads/temp'
      }
    )
  )
  async singup(
    @UploadedFiles()
    files: {
      profileImage?: Express.Multer.File;
      documentSideA?: Express.Multer.File;
      documentSideB?: Express.Multer.File;
      backgroundCheck?: Express.Multer.File;
      previusWorks?: Express.Multer.File[];
      certifications?: Express.Multer.File[];
    },
    @Body() body: CreateUserDTO
  ): Promise<any> {
    try {
      const user: User = await this.userService.create(files, {
        body: body
      });
      return { status: 'success', data: user };
    } catch (error) {
      this.logger.error(error.message ?? error);
      throw new HttpException(
        {
          status: 'error',
          message: `${UsersController.name}-${error.message ?? error}`
        },
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Patch(':guid')
  @Auth(RoleEnum.Super, RoleEnum.ServiceProvier, RoleEnum.Client, RoleEnum.Moderator)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update User' })
  @ApiResponse({ type: ResposeSuccessDataDTO, status: HttpStatus.OK })
  @ApiResponse({ type: ResposeDTO, status: HttpStatus.NOT_FOUND })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'profileImage', maxCount: 1 },
        { name: 'documentSideA', maxCount: 1 },
        { name: 'documentSideB', maxCount: 1 },
        { name: 'backgroundCheck', maxCount: 1 },
        { name: 'previusWorks', maxCount: 10 },
        { name: 'certifications', maxCount: 10 }
      ],
      {
        dest: './uploads/temp'
      }
    )
  )
  async update(
    @UploadedFiles()
    files: {
      profileImage?: Express.Multer.File;
      documentSideA?: Express.Multer.File;
      documentSideB?: Express.Multer.File;
      backgroundCheck?: Express.Multer.File;
      previusWorks?: Express.Multer.File[];
      certifications?: Express.Multer.File[];
    },

    @Param('guid') guid: string,
    @Body() body: UpdateUserDTO,
    @Req() request: { user: User }
  ): Promise<ResposeSuccessDataDTO> {
    try {
      const updatedUser = await this.userService.update(files, {
        guid: guid,
        body: body,
        updatedByGUID: request.user.guid
      });
      return { status: 'success', data: updatedUser };
    } catch (error) {
      this.logger.error(error.message ?? error);
      throw new HttpException(
        {
          status: 'error',
          message: `${UsersController.name}-${error.message ?? error}`
        },
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(':guid')
  @Auth(RoleEnum.Super)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete User' })
  @ApiResponse({ type: ResposeSuccessDataDTO, status: HttpStatus.OK })
  @ApiResponse({ type: ResposeDTO, status: HttpStatus.NOT_FOUND })
  async delete(@Param('guid') guid: string, @Req() request: { user: User }): Promise<ResposeSuccessDataDTO> {
    try {
      const service = await this.userService.delete({
        guid: guid,
        updatedByGUID: request.user.guid
      });
      return { status: 'success', data: service };
    } catch (error) {
      this.logger.error(error.message ?? error);
      throw new HttpException(
        {
          status: 'error',
          message: `${UsersController.name}-${error.message ?? error}`
        },
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
