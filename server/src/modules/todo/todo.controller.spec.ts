import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { ApiResponse } from '../../models/ApiResponse.model';

const mockValue = {
  id: 'f3c89c0b-aab5-4cdc-b073-e1a2988c50c1',
  title: 'CS-Go',
  isComplete: false,
  createdAt: '2023-04-01T21:03:21.259Z',
  updatedAt: null,
  categoryId: '96d3a7ce-dab4-4ee0-8e9a-42bf063f2ce8',
};

describe('TodoController', () => {
  let todoController: TodoController;
  let todoService: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockValue),
            update: jest.fn().mockResolvedValue(mockValue),
            changeIsCompleteStatus: jest.fn().mockResolvedValue(mockValue),
            remove: jest.fn().mockResolvedValue({
              status: 200,
              message: 'Success to delete ToDo',
            }),
          },
        },
      ],
    }).compile();

    todoController = module.get<TodoController>(TodoController);
    todoService = module.get(TodoService);
  });

  it('should be defined', () => {
    expect(todoController).toBeDefined();
  });

  describe('create', () => {
    it('should return a created category', async () => {
      const result = await todoController.create({
        title: 'CsGo',
        category: '96d3a7ce-dab4-4ee0-8e9a-42bf063f2ce8',
      });

      expect(result).toEqual(
        new ApiResponse(201, 'Success to create ToDo', mockValue),
      );
    });
  });

  describe('update', () => {
    it('should return a updated category', async () => {
      const result = await todoController.update(
        '6f366e41-ae8f-43b0-af48-954349c57b55',
        { title: 'Estudos' },
      );

      expect(result).toEqual(
        new ApiResponse(200, 'Success to update ToDo', mockValue),
      );
    });
  });

  describe('delete', () => {
    it('should return only api response without data', async () => {
      const result = await todoController.remove(
        '96d3a7ce-dab4-4ee0-8e9a-42bf063f2ce8',
      );

      expect(result).toEqual(new ApiResponse(200, 'Success to delete ToDo'));
    });
  });
});
