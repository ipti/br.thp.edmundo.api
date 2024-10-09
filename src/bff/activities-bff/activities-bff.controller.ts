import { Body, Controller, Get, Post, Put, Query, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateClassroomActivitiesDto } from './dto/update-classrom-activities.dto';
import { ActivitiesBffService } from './service/activities-bff.service';
import { ClassroomAvaliationDto } from './dto/classroom_avaliation';

@ApiTags('Activities-bff')
@Controller('activities-bff')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class ActivitiesBffController {
  constructor(private ActivitiesBffService: ActivitiesBffService) { }

  @Get('')
  async getById(@Query('id') id: number, @Req() req: Request
  ) {
    return this.ActivitiesBffService.findActivities(id, req.user);
  }


  @Get('user-classroom')
  async getByIdUser(@Query('id') id: number
  ) {
    return this.ActivitiesBffService.findActivitiesUser(id);
  }




  @Post('add-activities-classroom')
  async create(
    @Query('idClassroom') idClassroom: number,
    @Query('idActivities') idActivities: number,
  ) {
    return this.ActivitiesBffService.addActivities(idActivities, idClassroom);
  }

  @Post('add-activities-classroom-user')
  async createuseractivities(
    @Query('idClassroom') idClassroom: number,
    @Query('idActivities') idActivities: number,
    @Req() req: Request
  ) {
    return this.ActivitiesBffService.addUserActivities(
      idActivities,
      idClassroom,
      req.user.id,
    );
  }

  @Put('finish-activities-classroom-user')
  @UseInterceptors(FilesInterceptor('files', 10)) 
  async finishuseractivities(
    @Query('id') id: number,
    @UploadedFile('files') files: any, 
  ) {
    return this.ActivitiesBffService.FinishUserActivities(id, files);
  }


  @Put('edit-activities-classroom')
  async update(
    @Query('id') id: number,
    @Body() update: UpdateClassroomActivitiesDto,
  ) {
    return this.ActivitiesBffService.updateClassroomActivities(id, update);
  }

  @Post('classroom-avaliation')
  async avaliationcreate(
    @Query('id') id: number,
    @Body() body: ClassroomAvaliationDto,
  ) {
    return this.ActivitiesBffService.avaliationActivities(id, body);
  }

  @Put('classroom-avaliation')
  async avaliationupdate(
    @Query('id') id: number,
    @Body() body: ClassroomAvaliationDto,
  ) {
    return this.ActivitiesBffService.updateavaliationActivities(id, body);
  }

}
