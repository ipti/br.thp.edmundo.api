import { Body, Controller, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ChartBffService } from './service/chart-bff.service';

@ApiTags('Chart-bff')
@Controller('chart-bff')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class ChartBffController {
  constructor(private ChartBffService: ChartBffService) { }

  @Get('classroom')
  async getClassroom(@Query('id') id: number) {
    return this.ChartBffService.findChartClassroom(id);
  }

  @Get('classroom-user')
  async getUser(
    @Query('idClassroom') idClassroom: number,
    @Query('idUser') idUser: number,
  ) {
    return this.ChartBffService.findChartClassroomUser(idClassroom, idUser);
  }

  @Get('module-user')
  async getUserModulo(
    @Query('idClassroom') idClassroom: number,
    @Query('idModule') idModule: number,
    @Query('idUser') idUser: number,
  ) {
    return this.ChartBffService.findChartModuloClassroomUser(
      idClassroom,
      idUser,
      idModule,
    );
  }

  @Get('module-user-media')
  async getUserModuloMedia(
    @Query('idClassroom') idClassroom: number,
    @Query('idUser') idUser: number,
  ) {
    return this.ChartBffService.findChartModuloMediaClassroomUser(
      idClassroom,
      idUser
    );
  }

  @Get('classroom-activities-media')
  async getUserClassroomActivitiesMedia(
    @Query('idClassroom') idClassroom: number
  ) {
    return this.ChartBffService.findChartMediaActivities(idClassroom);
  }



}
