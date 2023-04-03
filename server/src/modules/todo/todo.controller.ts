import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { ApiResponse } from '../../models/ApiResponse.model';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() createTodoDto: TodoDTO) {
    return new ApiResponse(
      HttpStatus.CREATED,
      'Success to create ToDo',
      await this.todoService.create(createTodoDto),
    );
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDTO) {
    return new ApiResponse(
      HttpStatus.OK,
      'Success to update ToDo',
      await this.todoService.update(id, updateTodoDto),
    );
  }

  @Patch('/:id')
  async changeIsCompleteStatus(@Param('id') id: string) {
    return new ApiResponse(
      HttpStatus.OK,
      'Success to mark with complete this ToDo',
      await this.todoService.changeIsCompleteStatus(id),
    );
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
