import { Controller, Get, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ClassroomBffService } from './service/classroom-bff.service';
import { Request } from 'express';

@ApiTags('Classroom-bff')
@Controller('classroom-bff')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class ClassroomBffController {
  constructor(private ClassroomBffService: ClassroomBffService) { }

  @Get('')
  async getById(
    @Req() req: Request,
    @Query('idReapplication') idReapplication: number,
  ) {
    return this.ClassroomBffService.findClassroomReapplication(
      req.user.id,
      idReapplication,
    );
  }

  @Put('join-the-classroom')
  async update(
    @Query('idUser') idUser: number,
    @Query('idClassroom') idClassroom: number,
  ) {
    return this.ClassroomBffService.jointheClassroom(idUser, idClassroom);
  }

}
