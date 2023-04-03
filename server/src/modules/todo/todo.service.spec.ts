import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { ApiResponse } from '../../models/ApiResponse.model';
import { NotExistsError } from '../../models/errors/NotExists.error';

const mockValue = {
  id: 'f3c89c0b-aab5-4cdc-b073-e1a2988c50c1',
  title: 'CS-Go',
  isComplete: false,
  createdAt: '2023-04-01T21:03:21.259Z',
  updatedAt: null,
  categoryId: '96d3a7ce-dab4-4ee0-8e9a-42bf063f2ce8',
};

const updatedValue = {
  id: 'f3c89c0b-aab5-4cdc-b073-e1a2988c50c1',
  title: 'Counter-Strike',
  isComplete: false,
  createdAt: '2023-04-01T21:03:21.259Z',
  updatedAt: '2023-04-02T00:56:22.363Z',
  categoryId: '96d3a7ce-dab4-4ee0-8e9a-42bf063f2ce8',
};

const turnAsComplete = {
  id: 'f3c89c0b-aab5-4cdc-b073-e1a2988c50c1',
  title: 'Counter-Strike',
  isComplete: true,
  createdAt: '2023-04-01T21:03:21.259Z',
  updatedAt: '2023-04-02T00:56:22.363Z',
  categoryId: '96d3a7ce-dab4-4ee0-8e9a-42bf063f2ce8',
};

const db = {
  todo: {
    create: jest.fn().mockResolvedValue(mockValue),
    update: jest.fn().mockResolvedValue(updatedValue),
    delete: jest.fn().mockReturnValue(undefined),
    findUnique: jest.fn().mockResolvedValue(mockValue),
  },
};

describe('TodoService', () => {
  let todoService: TodoService;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    todoService = module.get<TodoService>(TodoService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(todoService).toBeDefined();
    expect(prisma).toBeDefined();
  });

  describe('create', () => {
    it('should return todo object created', async () => {
      const result = await todoService.create({
        title: 'CS-Go',
        category: '96d3a7ce-dab4-4ee0-8e9a-42bf063f2ce8',
      });

      expect(result).toEqual(mockValue);
    });
  });

  describe('update', () => {
    it('should return todo object updated', async () => {
      const result = await todoService.update(
        'f3c89c0b-aab5-4cdc-b073-e1a2988c50c1',
        { title: 'Counter-Strike' },
      );

      expect(result).toEqual(updatedValue);
    });

    it('should return NotExistsError, because not found Todo', async () => {
      jest.spyOn(prisma.todo, 'findUnique').mockResolvedValueOnce(null);

      expect(
        todoService.update('f3c89c0b-aab5-4cdc-b073-e1a2988c50c1', {
          title: 'Counter-Strike',
        }),
      ).rejects.toThrowError(NotExistsError);
    });
  });

  describe('changeIsCompleteStatus', () => {
    it('should return todo object with isComplete true', async () => {
      const result = await todoService.changeIsCompleteStatus(
        'f3c89c0b-aab5-4cdc-b073-e1a2988c50c1',
      );

      expect(result).toEqual(updatedValue);
    });

    it('should return NotExistsError, because not found Todo', async () => {
      jest.spyOn(prisma.todo, 'findUnique').mockResolvedValueOnce(null);

      expect(
        todoService.changeIsCompleteStatus(
          'f3c89c0b-aab5-4cdc-b073-e1a2988c50c1',
        ),
      ).rejects.toThrowError(NotExistsError);
    });
  });

  describe('delete', () => {
    it('should return only api response body without data', async () => {
      const result = await todoService.remove(
        '96d3a7ce-dab4-4ee0-8e9a-42bf063f2ce8',
      );

      expect(result).toEqual(new ApiResponse(200, 'Success to delete ToDo'));
    });
  });
});
