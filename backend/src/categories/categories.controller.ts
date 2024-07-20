import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ResposeDTO,
  ResposeSuccessDataDTO,
  ResposeSuccessPaginationDTO,
} from '../app/api.dto';
import {
  Auth,
  DefaultController,
} from '../app/defaults/default.controller';
import { RoleEnum } from '../roles/role.enum';
import { User } from '../users/users.entity';
import { CreateCategoryDto } from '../categories/dto/create-category.dto';
import { UpdateCategoryDto } from '../categories/dto/update-category.dto';
import { Category } from '../categories/entities/category.entity';
import { CategoriesService } from './categories.service';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController extends DefaultController {
  @Inject(CategoriesService)
  private readonly categoryService: CategoriesService;

  constructor() {
    super(CategoriesController);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ type: ResposeSuccessPaginationDTO, status: HttpStatus.OK })
  async all(@Query() query: any): Promise<ResposeSuccessPaginationDTO> {
    try {
      return {
        status: 'success',
        data: await this.categoryService.all({ query: query }),
      };
    } catch (error) {
      this.logger.error(error.message ?? error);
      throw new HttpException(
        {
          status: 'error',
          message: `${CategoriesController.name}-${error.message ?? error}`,
        },
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':guid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get one category by guid' })
  @ApiResponse({ type: ResposeSuccessDataDTO, status: HttpStatus.OK })
  @ApiResponse({ type: ResposeDTO, status: HttpStatus.NOT_FOUND })
  async findOne(@Param('guid') guid: string): Promise<ResposeSuccessDataDTO> {
    try {
      const category = await this.categoryService.getBy({
        query: { guid: guid },
      });
      return { status: 'success', data: category };
    } catch (error) {
      this.logger.error(error.message ?? error);
      throw new HttpException(
        {
          status: 'error',
          message: `${CategoriesController.name}-${error.message ?? error}`,
        },
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  @Auth(RoleEnum.Super, RoleEnum.Moderator)
  @UseInterceptors(
    FileInterceptor('image', {
      dest: './uploads/temp',
    }),
  )
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create Category' })
  @ApiResponse({ type: ResposeSuccessDataDTO, status: HttpStatus.CREATED })
  @ApiResponse({ type: ResposeDTO, status: HttpStatus.CONFLICT })
  async create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({
            maxSize: 20000000,
          }),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
    @Body() body: CreateCategoryDto,
    @Req() request: { user: User },
  ): Promise<any> {
    try {
      const category: Category = await this.categoryService.create(file, {
        body: body,
        createdByGUID: request.user.guid,
      });
      return { status: 'success', data: category };
    } catch (error) {
      this.logger.error(error.message ?? error);
      throw new HttpException(
        {
          status: 'error',
          message: `${CategoriesController.name}-${error.message ?? error}`,
        },
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':guid')
  @Auth(RoleEnum.Super, RoleEnum.Moderator)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Category' })
  @ApiResponse({ type: ResposeSuccessDataDTO, status: HttpStatus.OK })
  @ApiResponse({ type: ResposeDTO, status: HttpStatus.NOT_FOUND })
  @UseInterceptors(
    FileInterceptor('image', {
      dest: './uploads/temp',
    }),
  )
  async update(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({
            maxSize: 20000000,
          }),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
    @Param('guid') guid: string,
    @Body() body: UpdateCategoryDto,
    @Req() request: { user: User },
  ): Promise<ResposeSuccessDataDTO> {
    try {
      const updatedCategory = await this.categoryService.update(file, {
        guid: guid,
        body: body,
        updatedByGUID: request.user.guid,
      });
      return { status: 'success', data: updatedCategory };
    } catch (error) {
      this.logger.error(error.message ?? error);
      throw new HttpException(
        {
          status: 'error',
          message: `${CategoriesController.name}-${error.message ?? error}`,
        },
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':guid')
  @Auth(RoleEnum.Super, RoleEnum.Moderator)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete Category' })
  @ApiResponse({ type: ResposeSuccessDataDTO, status: HttpStatus.OK })
  @ApiResponse({ type: ResposeDTO, status: HttpStatus.NOT_FOUND })
  async delete(
    @Param('guid') guid: string,
    @Body() body: UpdateCategoryDto,
    @Req() request: { user: User },
  ): Promise<ResposeSuccessDataDTO> {
    try {
      const category = await this.categoryService.delete({
        guid: guid,
        deletedByGUID: request.user.guid,
      });
      return { status: 'success', data: category };
    } catch (error) {
      this.logger.error(error.message ?? error);
      throw new HttpException(
        {
          status: 'error',
          message: `${CategoriesController.name}-${error.message ?? error}`,
        },
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
