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


}
