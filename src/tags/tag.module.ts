import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TagController } from './tag.controller';
import { TagsService } from './shared/tags.service';

@Module({
  imports: [PrismaModule],
  controllers: [TagController],
  providers: [TagsService],
  exports: [TagsService],
})
export class TagsModule {}
