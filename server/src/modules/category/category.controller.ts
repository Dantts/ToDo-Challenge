import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { CategoryDto } from './models/dto/category.dto';
import { ApiResponse } from '../../models/ApiResponse.model';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async findAll(@CurrentUser() user: User) {
    return new ApiResponse(
      HttpStatus.OK,
      'Success to get all categories',
      await this.categoryService.findAll(user),
    );
  }

  @Post()
  async create(@CurrentUser() user: User, @Body() category: CategoryDto) {
    return new ApiResponse(
      HttpStatus.CREATED,
      'Success to create category',
      await this.categoryService.create(user, category),
    );
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() category: CategoryDto) {
    return new ApiResponse(
      HttpStatus.OK,
      'Success to update category',
      await this.categoryService.update(id, category),
    );
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
