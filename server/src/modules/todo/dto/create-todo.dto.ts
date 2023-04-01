import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  isNotEmpty,
} from 'class-validator';

export class TodoDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  title: string;

  @IsNotEmpty()
  category: any;
}
