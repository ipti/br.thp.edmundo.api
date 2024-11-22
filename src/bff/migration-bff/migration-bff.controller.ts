import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TagResponse } from './doc/migration-bff.response';
import { MigrationDto } from './dto/migration-bff.dto';
import { MigrationBffService } from './shared/migration-bff.service';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('migration-bff')
@ApiTags('MigrationBff')
export class MigrationBffController {
  constructor(private MigrationBffService: MigrationBffService) {}

  @Post('')
  @ApiCreatedResponse({ type: TagResponse })
  async createTagUser(@Body() MigrationDto: MigrationDto) {
    return this.MigrationBffService.migrationMeuBen(MigrationDto);
  }

  @Get('')
  async getAll() {
    return this.MigrationBffService.findTsAll();
  }
}
