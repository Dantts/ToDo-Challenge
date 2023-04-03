import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';
import { CategoryDto } from './models/dto/category.dto';
import { ApiResponse } from '../../models/ApiResponse.model';
import { NotExistsError } from '../../models/errors/NotExists.error';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async findAll(user: User) {
    const categoryData = await this.prisma.category.findMany({
      where: {
        userId: user.id,
      },
      include: {
        todo: true,
      },
    });

    return categoryData;
  }

  async create(user: User, category: CategoryDto) {
    const categoryData = await this.prisma.category.create({
      data: {
        ...category,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return categoryData;
  }

  async update(id: string, category: CategoryDto) {
    const categoryExists = await this.verifyIfExists(id);

    if (!categoryExists) throw new NotExistsError('This category not exists');

    const categoryData = await this.prisma.category.update({
      where: {
        id,
      },
      data: category,
      include: {
        todo: true,
      },
    });

    return categoryData;
  }

  async delete(id: string) {
    const categoryExists = await this.verifyIfExists(id);

    if (!categoryExists) throw new NotExistsError('This category not exists');

    await this.prisma.todo.deleteMany({
      where: {
        categoryId: id,
      },
    });

    await this.prisma.category.delete({
      where: {
        id,
      },
    });

    return new ApiResponse(HttpStatus.OK, 'Success to exclude category.');
  }

  private async verifyIfExists(id: string) {
    return await this.prisma.category.findUnique({
      where: {
        id,
      },
      include: {
        todo: true,
      },
    });
  }
}
