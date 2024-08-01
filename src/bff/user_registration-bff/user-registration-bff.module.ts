import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserBffService } from './service/user-registration-bff.service';
import { UserBffController } from './user-registration-bff.controller';

@Module({
  imports: [PrismaModule],
  controllers: [UserBffController],
  providers: [UserBffService],
  exports: [UserBffService],
})
export class UserBffModule {}
