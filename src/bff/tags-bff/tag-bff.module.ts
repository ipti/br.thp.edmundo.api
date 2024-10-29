import { Module } from '@nestjs/common';
import { TagController } from './tag-bff.controller';
import { TagsService } from './shared/tags-bff.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TagController],
  providers: [TagsService],
  exports: [TagsService],
})
export class TagsModule {}
