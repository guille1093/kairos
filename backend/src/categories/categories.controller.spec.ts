import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: {
            all: jest.fn().mockResolvedValue('all'),
            getBy: jest.fn().mockResolvedValue('getBy'),
            create: jest.fn().mockResolvedValue('create'),
            update: jest.fn().mockResolvedValue('update'),
          },
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // it('should get all categories', async () => {
  //   expect(await controller.all({}, {} as any)).toEqual({
  //     status: 'success',
  //     data: 'all',
  //   });
  //   expect(service.all).toHaveBeenCalled();
  // });

  it('should get one category by guid', async () => {
    expect(await controller.findOne('guid')).toEqual({
      status: 'success',
      data: 'getBy',
    });
    expect(service.getBy).toHaveBeenCalled();
  });

  it('should create a category', async () => {
    const mockCategory: CreateCategoryDto = {
      name: 'name',
      description: 'description',
    };
    expect(await controller.create(mockCategory, {} as any)).toEqual({
      status: 'success',
      data: 'create',
    });
    expect(service.create).toHaveBeenCalled();
  });

  it('should update a category', async () => {
    const mockUser = {
      guid: 'guid',
      username: 'username',
      name: 'name',
      lastname: 'lastname',
      googleID: 'googleID',
      email: 'email',
      isActive: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockCategory: UpdateCategoryDto = {
      name: 'name',
      description: 'description',
    };
    expect(
      await controller.update(
        'guid',
        mockCategory as UpdateCategoryDto,
        mockUser as any,
      ),
    ).toEqual({
      status: 'success',
      data: 'update',
    });
    expect(service.update).toHaveBeenCalled();
  });
});
