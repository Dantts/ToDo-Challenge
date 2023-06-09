import { Injectable, HttpStatus } from '@nestjs/common';
import { TodoDTO } from './dto/create-todo.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { NotExistsError } from '../../models/errors/NotExists.error';
import { ApiResponse } from '../../models/ApiResponse.model';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async create(createTodoDto: TodoDTO) {
    const todoData = await this.prisma.todo.create({
      data: {
        ...createTodoDto,
        category: {
          connect: {
            id: createTodoDto.category,
          },
        },
      },
    });

    return todoData;
  }

  async update(id: string, updateTodoDto: UpdateTodoDTO) {
    const todoExists = await this.verifyIfExists(id);

    if (!todoExists) throw new NotExistsError('This ToDo not exists');

    const todoData = await this.prisma.todo.update({
      where: {
        id,
      },
      data: {
        ...updateTodoDto,
        updatedAt: new Date(),
      },
    });

    return todoData;
  }

  async changeIsCompleteStatus(id: string) {
    const todoExists = await this.verifyIfExists(id);

    if (!todoExists) throw new NotExistsError('This ToDo not exists');

    const todoData = await this.prisma.todo.update({
      where: {
        id,
      },
      data: {
        ...todoExists,
        isComplete: !todoExists.isComplete,
        updatedAt: new Date(),
      },
    });

    return todoData;
  }

  async remove(id: string) {
    const todoExists = this.verifyIfExists(id);

    if (!todoExists) throw new NotExistsError('This ToDo not exists');

    await this.prisma.todo.delete({
      where: {
        id,
      },
    });

    return new ApiResponse(HttpStatus.OK, 'Success to delete ToDo');
  }

  private async verifyIfExists(id: string) {
    return await this.prisma.todo.findUnique({
      where: {
        id,
      },
    });
  }
}
