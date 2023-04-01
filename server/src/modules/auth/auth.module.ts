import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

const jwtOptions = {
  secret: process.env.JWT_SECRET,
  signOptions: {
    expiresIn: '30d',
  },
};

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [PrismaModule, JwtModule.register(jwtOptions)],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
