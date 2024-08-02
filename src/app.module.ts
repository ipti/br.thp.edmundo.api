import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtMiddleware } from './utils/middleware/jwt.middleware';
import { ConfigModule } from '@nestjs/config';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { ClassroomModule } from './classroom/classroom.module';
import { ReapplicationModule } from './reapplication/reapplication.module';
import { BFFModule } from './bff/bff.module';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true }),
    PrometheusModule.register(),
    PrismaModule,
    UsersModule,
    AuthModule,
    ClassroomModule,
    ReapplicationModule,
    BFFModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('*');
  }
}
