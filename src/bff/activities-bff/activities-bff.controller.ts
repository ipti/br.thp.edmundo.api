import { Body, Controller, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ActivitiesBffService } from './service/activities-bff.service';
import { UpdateClassroomActivitiesDto } from './dto/update-classrom-activities.dto';

@ApiTags('Activities-bff')
@Controller('activities-bff')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class ActivitiesBffController {
  constructor(private ActivitiesBffService: ActivitiesBffService) { }

  @Get('')
  async getById(@Query('id') id: number) {
    return this.ActivitiesBffService.findActivities(id);
  }

  @Post('add-activities-classroom')
  async create(
    @Query('idClassroom') idClassroom: number,
    @Query('idActivities') idActivities: number,
  ) {
    return this.ActivitiesBffService.addActivities(idActivities, idClassroom);
  }


  @Put('add-cctivities-classroom')
  async update(
    @Query('id') id: number,
    @Body() update: UpdateClassroomActivitiesDto,
  ) {
    return this.ActivitiesBffService.updateClassroomActivities(id, update);
  }

}
