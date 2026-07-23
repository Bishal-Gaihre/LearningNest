import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './../prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [
    // Load environment variables globally (.env)
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    // Core Database Module
    PrismaModule,

    // Feature Modules
    AuthModule,
    UsersModule,
    TasksModule,
  ],
})
export class AppModule {}