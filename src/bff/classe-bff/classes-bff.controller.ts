import { Body, Controller, Get, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateClassroomClassesDto } from './dto/update-classrom-classes.dto';
import { ClasseBffService } from './service/classe-bff.service';
import { UpdateViewdClassesDto } from './dto/viewd-classes.dto';

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

  @Patch('viewd-classe-user')
  @ApiCreatedResponse({ type: UpdateViewdClassesDto })
  async ViewdClasse(
    @Body() body: UpdateViewdClassesDto,
  ) {
    return await this.ClasseBffService.ViewdClasse(body);
  }


}
