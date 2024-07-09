import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/shared/users.service';
import { JwtStrategy } from '../strategies/jwt-strategy';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtStrategy: JwtStrategy,
  ) {}

  async validateUser(userEmail: string, userPassword: string) {
    const user = await this.usersService.findOneByEmail(userEmail);

    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    if (
      user &&
      this.usersService.validatePassword(userPassword, user.password)
    ) {
      const { name, email, id } = user;

      return { name, email, id };
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };

    const userRegistered = await this.usersService.findOneByEmail(
      user.email,
    );

    return {
      access_token: this.jwtStrategy.generateSignToken(payload),
      userRegistered,
    };
  }

  async refreshToken(user) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtStrategy.generateSignToken(payload),
    };
  }
}
