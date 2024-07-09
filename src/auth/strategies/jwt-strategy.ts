import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../shared/constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  generateSignToken(payload: { sub: any; email: any }) {
    return this.jwtService.sign(payload, { secret: jwtConstants.secret, expiresIn: '7200s' });
  }

  async validate(payload: any) {
    return { id: payload.sub, email: payload.email, type: payload.type, role: payload.role };
  }

}
