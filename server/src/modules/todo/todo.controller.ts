import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() createTodoDto: TodoDTO) {
    return this.todoService.create(createTodoDto);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDTO) {
    return this.todoService.update(id, updateTodoDto);
  }

  @Patch('/:id')
  async changeIsCompleteStatus(@Param('id') id: string) {
    return this.todoService.changeIsCompleteStatus(id);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
