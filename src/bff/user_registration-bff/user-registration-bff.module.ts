import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserRegistrationBffService } from './service/user-registration-bff.service';
import { UserRegistrationBffController } from './user-registration-bff.controller';

@Module({
  imports: [PrismaModule],
  controllers: [UserRegistrationBffController],
  providers: [UserRegistrationBffService],
  exports: [UserRegistrationBffService],
})
export class UserRegistrationBffModule {}
