import { Body, Controller, Get, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ModuleBffService } from './service/module-bff.service';
import { UpdateClassroomModuleDto } from './dto/update-classrom-module.dto';
import { Request } from 'express';

@ApiTags('Module-bff')
@Controller('module-bff')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class ModuleBffController {
  constructor(private ModuleBffService: ModuleBffService) { }

  @Get('')
  async getById(@Query('id') id: number) {
    return this.ModuleBffService.findModule(
      id
    );
  }

  @Get('classroom-student')
  async getClassroom(
    @Query('id') id: number,
    @Query('idClassroom') idClassroom: number,
    @Req() req: Request

  ) {
    return this.ModuleBffService.findModuleClassroomStudent(
      id,
      idClassroom,
      req.user.id,
    );
  }


  @Get('all')
  async getAll(@Query('id') id: number) {
    return this.ModuleBffService.findModuleAll(id);
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


  @Put('remove-module-classroom')
  async remove(
    @Query('idClassroom') idClassroom: number,
    @Query('idModule') idModule: number,
  ) {
    return this.ModuleBffService.RemoveModule(idModule, idClassroom);
  }
}
