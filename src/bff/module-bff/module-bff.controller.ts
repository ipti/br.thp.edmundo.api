import { Body, Controller, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ModuleBffService } from './service/module-bff.service';
import { UpdateClassroomModuleDto } from './dto/update-classrom-module.dto';

@ApiTags('Module-bff')
@Controller('module-bff')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class ModuleBffController {
  constructor(private ModuleBffService: ModuleBffService) { }

  @Get('')
  async getById(@Query('id') id: number) {
    return this.ModuleBffService.findModule(id);
  }

  @Get('classroom')
  async getByIdClassroom(@Query('id') id: number) {
    return this.ModuleBffService.findModuleClassroom(id);
  }

  @Post('add-module-classroom')
  async create(
    @Query('idClassroom') idClassroom: number,
    @Query('idModule') idModule: number,
  ) {
    return this.ModuleBffService.AddModule(idModule, idClassroom);
  }


  @Put('add-module-classroom')
  async update(
    @Query('id') id: number,
    @Body() update: UpdateClassroomModuleDto,
  ) {
    return this.ModuleBffService.updateClassroomModule(id, update);
  }

}
