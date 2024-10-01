import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  CreateFormResponseDoc
} from './doc/create-form.doc';
import { CreateFormDto } from './dto/create-form.dto';
import { FormBffService } from './service/form-bff.service';

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
}
