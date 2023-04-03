import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './models/dto/create-user.dto';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';
import { AuthRequest } from './models/requests/Auth.request';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './models/entities/user.entity';
import { ApiResponse } from '../../models/ApiResponse.model';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('me')
  getMe(@CurrentUser() user: User) {
    return user;
  }

  @Post('sign-up')
  @IsPublic()
  async signUp(@Body() createUserDto: CreateUserDto) {
    return new ApiResponse(
      HttpStatus.CREATED,
      'Success',
      await this.authService.signUp(createUserDto),
    );
  }

  @Post('sign-in')
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() user: AuthRequest) {
    return new ApiResponse(
      HttpStatus.OK,
      'Success',
      await this.authService.signIn(user),
    );
  }
}
