import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { GroupController } from './group_avaliation.controller';
import { GroupService } from './shared/group_avaliation.service';

@Module({
  imports: [PrismaModule],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
