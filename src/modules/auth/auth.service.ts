import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { accessTokenOptions, refreshTokenOptions } from './tokens.options';
import { User } from '../users/user.model';
import { JwtPayload } from './jwt-payload';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async oAuthLogin(user: User) {
    if (!user) {
      throw new Error('User not found!!!');
    }

    const payload: JwtPayload = {
      id: user.id,
    };

    const accessToken = await this.jwtService.sign(payload, accessTokenOptions);
    const refreshToken = await this.jwtService.sign(
      payload,
      refreshTokenOptions,
    );

    return { accessToken, refreshToken };
  }
}
