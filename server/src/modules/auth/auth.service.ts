import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './models/dto/create-user.dto';
import { User } from './models/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthRequest } from './models/requests/Auth.request';
import { AuthResponse } from './models/responses/AuthResponse.model';
import { ApiResponse } from '../../models/ApiResponse.model';
import { UnauthorizedError } from './models/errors/Unauthorized.error';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signUp(
    createUserDto: CreateUserDto,
  ): Promise<ApiResponse<AuthResponse>> {
    if (await this.findByUsername(createUserDto.username)) {
      throw new UnauthorizedError('User Already exists');
    }

    const data: User = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.prisma.user.create({
      data,
    });

    const payload = {
      id: createdUser.id,
      username: createdUser.username,
      name: createdUser.name,
    };

    return new ApiResponse(
      HttpStatus.CREATED,
      'Success',
      new AuthResponse(
        createdUser.id,
        createdUser.name,
        this.jwtService.sign(payload),
      ),
    );
  }

  async signIn(authData: AuthRequest): Promise<ApiResponse<AuthResponse>> {
    const user = await this.findByUsername(authData.username);

    if (!user || !(await bcrypt.compare(authData.password, user.password))) {
      throw new UnauthorizedError('User data not match');
    }

    const payload = {
      id: user.id,
      username: user.username,
      name: user.name,
    };

    return new ApiResponse(
      HttpStatus.CREATED,
      'Success',
      new AuthResponse(user.id, user.name, this.jwtService.sign(payload)),
    );
  }

  private findByUsername(username: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { username } });
  }
}
