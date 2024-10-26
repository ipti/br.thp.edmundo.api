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
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ClassesResponse } from './doc/classes.response';
import { CreateClassesDto } from './dto/create-classes.dto';
import { UpdateClassesDto } from './dto/update-classes.dto';
import { ClassesService } from './shared/classes.service';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('classes')
@ApiTags('Classes')
export class ClassesController {
  constructor(private ClassesService: ClassesService) { }

  @Post()
  @ApiCreatedResponse({ type: ClassesResponse })
  async create(@Req() req: Request, @Body() classes: CreateClassesDto) {
    return this.ClassesService.create(req.user, classes);
  }

  @Get()
  async getAll() {
    return this.ClassesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ClassesResponse })
  async getById(@Param('id') id: string) {
    return this.ClassesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() classes: UpdateClassesDto,
  ) {
    return this.ClassesService.update(req.user, id, classes);
  }

  @Delete(':id')
  async delete(@Req() req: Request, @Param('id') id: string) {
   return this.ClassesService.remove(req.user, id);
  }
}
