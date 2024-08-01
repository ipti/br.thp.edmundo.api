import { Body, Controller, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserResponse } from './doc/users-registration.response';
import { UpdateUserDto } from './dto/update-user-registration.dto';
import { UserBffService } from './service/user-registration-bff.service';


@ApiTags('User-Registration-bff')
@Controller('user-registration-bff')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class UserBffController {
  constructor(private UserService: UserBffService) { }

  @Put()
  @ApiCreatedResponse({ type: UserResponse })
  async updateUser(
    @Body() user: UpdateUserDto,
    @Query('idUser') idUser: string,
  ) {
    return this.UserService.updateUser(user, idUser);
  }


}
