import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsNotEmpty,
} from 'class-validator';
import { Category } from '../entities/category.entity';

export class CategoryDto extends Category {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  title: string;
}
