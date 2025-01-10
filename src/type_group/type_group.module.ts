import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TypeGroupController } from './type_group.controller';
import { TypeGroupService } from './shared/type_group.service';

@Module({
  imports: [PrismaModule],
  controllers: [TypeGroupController],
  providers: [TypeGroupService],
  exports: [TypeGroupService],
})
export class TypeGroupModule {}
