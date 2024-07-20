import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let repo: Repository<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    repo = module.get<Repository<Category>>(getRepositoryToken(Category));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getBy', () => {
    it('should return a category', async () => {
      const category = new Category();
      category.guid = 'test-guid';
      category.name = 'test-name';

      jest.spyOn(repo, 'findOne').mockResolvedValue(category);

      const result = await service.getBy({ query: { guid: 'test-guid' } });
      expect(result).toEqual(category);
    });

    describe('all', () => {
      it('should return an array of categories', async () => {
        const category = new Category();
        category.guid = 'test-guid';
        category.name = 'test-name';

        jest.spyOn(repo, 'findAndCount').mockResolvedValue([[category], 1]);

        const result = await service.all({
          query: { pageSize: '10', offset: '0' },
        });
        expect(result).toEqual({
          offset: 0,
          pageSize: 10,
          results: [category],
          total: 1,
        });
      });

      it('should return an empty array of categories', async () => {
        jest.spyOn(repo, 'findAndCount').mockResolvedValue([[], 0]);

        const result = await service.all({
          query: { pageSize: '10', offset: '0' },
        });
        expect(result).toEqual({
          offset: 0,
          pageSize: 10,
          results: [],
          total: 0,
        });
      });
    });
  });
});
