import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { ApiResponse } from '../../models/ApiResponse.model';

const userValue = {
  id: '5e84d8c0-cfde-40ad-aee8-60886fdcf5cf',
  name: 'Gabriel Dantas',
  username: 'dantts',
  // decrypted password = 1234
  password: '$2b$10$aY2OBhhw98vC6N3E0YgOneDCgcY2vV/2LS675qrmTx19XLOqb4dvi',
};

const mockValues = [
  {
    id: '96d3a7ce-dab4-4ee0-8e9a-42bf063f2ce8',
    title: 'Games',
    userId: '5e84d8c0-cfde-40ad-aee8-60886fdcf5cf',
    todo: [
      {
        id: 'f3c89c0b-aab5-4cdc-b073-e1a2988c50c1',
        title: 'Counter-Strike',
        isComplete: true,
        createdAt: '2023-04-01T21:03:21.259Z',
        updatedAt: '2023-04-02T00:56:22.363Z',
        categoryId: '96d3a7ce-dab4-4ee0-8e9a-42bf063f2ce8',
      },
      {
        id: 'd294228d-53df-4ce6-9c57-ea8fdfba1f50',
        title: 'Dead by Daylight',
        isComplete: false,
        createdAt: '2023-04-01T21:26:24.431Z',
        updatedAt: '2023-04-02T00:53:47.692Z',
        categoryId: '96d3a7ce-dab4-4ee0-8e9a-42bf063f2ce8',
      },
      {
        id: 'bd54f49e-5949-4719-8299-025d44ba895b',
        title: 'PubG',
        isComplete: false,
        createdAt: '2023-04-01T21:49:10.273Z',
        updatedAt: null,
        categoryId: '96d3a7ce-dab4-4ee0-8e9a-42bf063f2ce8',
      },
    ],
  },
  {
    id: '6f366e41-ae8f-43b0-af48-954349c57b55',
    title: 'Seila',
    userId: '5e84d8c0-cfde-40ad-aee8-60886fdcf5cf',
    todo: [],
  },
];

describe('CategoryController', () => {
  let categoryController: CategoryController;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockValues),
            create: jest.fn().mockResolvedValue(mockValues[1]),
            update: jest.fn().mockResolvedValue(mockValues[1]),
            delete: jest.fn().mockResolvedValue({
              status: 200,
              message: 'Success to exclude category.',
            }),
          },
        },
      ],
    }).compile();

    categoryController = module.get<CategoryController>(CategoryController);
    categoryService = module.get(CategoryService);
  });

  it('should be defined', () => {
    expect(categoryController).toBeDefined();
  });

  describe('FindAll', () => {
    it('should return all list of the category', async () => {
      const result = await categoryController.findAll(userValue);

      expect(result).toEqual(
        new ApiResponse(200, 'Success to get all categories', mockValues),
      );
    });
  });

  describe('create', () => {
    it('should return a created category', async () => {
      const result = await categoryController.create(userValue, mockValues[1]);

      expect(result).toEqual(
        new ApiResponse(201, 'Success to create category', mockValues[1]),
      );
    });
  });

  describe('update', () => {
    it('should return a updated category', async () => {
      const result = await categoryController.update(
        '6f366e41-ae8f-43b0-af48-954349c57b55',
        { title: 'Estudos' },
      );

      expect(result).toEqual(
        new ApiResponse(200, 'Success to update category', mockValues[1]),
      );
    });
  });

  describe('delete', () => {
    it('should return only api response without data', async () => {
      const result = await categoryController.delete(
        '96d3a7ce-dab4-4ee0-8e9a-42bf063f2ce8',
      );

      expect(result).toEqual(
        new ApiResponse(200, 'Success to exclude category.'),
      );
    });
  });
});
