import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateTodoDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  title: string;
}
