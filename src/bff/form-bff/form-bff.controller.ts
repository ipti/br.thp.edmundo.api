import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  CreateFormResponseDoc
} from './doc/create-form.doc';
import { Request } from 'express';

import { CreateFormDto } from './dto/create-form.dto';
import { FormBffService } from './service/form-bff.service';
import { CreateResponseDto } from './dto/create-response.dto';

@ApiTags('Form-bff')
@Controller('form-bff')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class FormBffController {
  constructor(private FormBffService: FormBffService) { }

  @ApiCreatedResponse({ type: CreateFormResponseDoc })
  @Post('')
  async create(@Body() form: CreateFormDto) {
    return this.FormBffService.createForm(form);
  }


  @ApiCreatedResponse({ type: CreateResponseDto })
  @Post('response')
  async createResponse(@Body() form: CreateResponseDto, @Req() req: Request) {
    return this.FormBffService.createResponse(form, req.user);
  }
}
