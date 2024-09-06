import { Body, Controller, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateClassroomClassesDto } from './dto/update-classrom-classes.dto';
import { ClasseBffService } from './service/classe-bff.service';

@ApiTags('Classe-bff')
@Controller('classe-bff')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class ClasseBffController {
  constructor(private ClasseBffService: ClasseBffService) { }

  @Get('')
  async getById(@Query('id') id: number) {
    return this.ClasseBffService.findClassesClassroom(id);
  }


  @Post('add-classe-classroom')
  async create(
    @Query('idClassroom') idClassroom: number,
    @Query('idClasse') idModule: number,
  ) {
    return this.ClasseBffService.addClasse(idModule, idClassroom);
  }


  @Put('add-classe-classroom')
  async update(
    @Query('id') id: number,
    @Body() update: UpdateClassroomClassesDto,
  ) {
    return this.ClasseBffService.updateClassroomClasse(id, update);
  }

}
