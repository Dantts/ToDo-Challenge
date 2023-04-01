import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { TodoModule } from './modules/todo/todo.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { CategoryService } from './modules/category/category.service';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [TodoModule, PrismaModule, AuthModule, CategoryModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    CategoryService,
  ],
})
export class AppModule {}
