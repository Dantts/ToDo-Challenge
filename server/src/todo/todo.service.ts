import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { TodoDTO } from './dto/todo.dto';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async create(createTodoDto: TodoDTO) {
    try {
      return await this.prisma.todo.create({
        data: createTodoDto,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //Adicionar logica de paginação.
  async findAll() {
    try {
      return await this.prisma.todo.findMany();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id: string, updateTodoDto: TodoDTO) {
    try {
      const todoExists = await this.prisma.todo.findUnique({
        where: {
          id,
        },
      });

      if (!todoExists) throw new Error('Todo not exists');

      return await this.prisma.todo.update({
        where: {
          id,
        },
        data: {
          ...updateTodoDto,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async changeIsCompleteStatus(id: string) {
    try {
      const todoExists = await this.prisma.todo.findUnique({
        where: {
          id,
        },
      });

      if (!todoExists) throw new Error('Todo not exists');

      return await this.prisma.todo.update({
        where: {
          id,
        },
        data: {
          ...todoExists,
          isComplete: !todoExists.isComplete,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(id: string) {
    try {
      const todoExists = await this.prisma.todo.findUnique({
        where: {
          id,
        },
      });

      if (!todoExists) throw new Error('Todo not exists');

      return this.prisma.todo.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
