import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ClassroomResponse } from './doc/classroom.response';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { ClassroomService } from './shared/classroom.service';
import { Request } from 'express';


@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('classroom')
@ApiTags('Classroom')
export class ClassroomController {
  constructor(private ClassroomService: ClassroomService) {}

  @Post()
  @ApiCreatedResponse({ type: ClassroomResponse })
  async create(@Req() req: Request, @Body() classroom: CreateClassroomDto) {
    return this.ClassroomService.create(req.user.id, classroom);
  }

  @Get()
  async getAll() {
    return this.ClassroomService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ClassroomResponse })
  async getById(@Param('id') id: string) {
    return this.ClassroomService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() classroom: UpdateClassroomDto) {
    return this.ClassroomService.update(id, classroom);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.ClassroomService.remove(id);
  }
}
