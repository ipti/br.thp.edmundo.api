import { Module } from '@nestjs/common';
import { TagBffController } from './tag-bff.controller';
import { TagsBffService } from './shared/tags-bff.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TagBffController],
  providers: [TagsBffService],
  exports: [TagsBffService],
})
export class TagsBffModule {}
