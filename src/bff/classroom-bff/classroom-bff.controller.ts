import {
  Controller,
  Get,
  Param,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ClassroomBffService } from './service/classroom-bff.service';
import { Request } from 'express';

@ApiTags('Classroom-bff')
@Controller('classroom-bff')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class ClassroomBffController {
  constructor(private ClassroomBffService: ClassroomBffService) {}

  @Get('reapplications')
  async getAll(
    @Req() req: Request,
    @Query('idReapplication') idReapplication: number,
  ) {
    return this.ClassroomBffService.findClassroomReapplication(
      req.user.id,
      idReapplication,
    );
  }

  @Get('user')
  async getUserStudent(@Req() req: Request) {
    return this.ClassroomBffService.findClassroomUser(req.user.id);
  }

  @Get('activities')
  async getUserStudentActivities(
    @Query('id') id: string,
    @Query('idModule') idModule: string,
  ) {
    return this.ClassroomBffService.findClassroomActivitiesUser(+id, +idModule);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.ClassroomBffService.findOne(id);
  }

  @Get(':id/members')
  async getByAll(@Query('id') id: string) {
    return this.ClassroomBffService.findOneMembers(id);
  }

  @Put('join-the-classroom')
  async update(
    @Query('idUser') idUser: number,
    @Query('idClassroom') idClassroom: number,
  ) {
    return this.ClassroomBffService.jointheClassroom(idUser, idClassroom);
  }
}
