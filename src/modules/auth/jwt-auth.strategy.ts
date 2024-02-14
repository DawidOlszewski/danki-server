import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import getenv from 'getenv';
import { JwtPayload } from './jwt-payload';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtGuardStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: getenv('JWT_SECRET_KEY'),
    });
  }

  async validate({ id }: JwtPayload) {
    return this.usersService.findById(id);
  }
}
