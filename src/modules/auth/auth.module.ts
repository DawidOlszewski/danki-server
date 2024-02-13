import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuardStrategy } from './jwt-auth.strategy';
import { JwtGuard } from './guards/jwt-auth.guard';
import { GoogleStrategy } from './google-oauth.strategy';
import getenv from 'getenv';
import { UsersModule } from '../users/users.module';
import { Identity } from './identity.model';
import { ObjectionModule } from '@willsoto/nestjs-objection';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: getenv('SECRET_KEY'),
        global: true,
      }),
    }),
    UsersModule,
    ObjectionModule.forFeature([Identity]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtGuardStrategy, JwtGuard, GoogleStrategy],
})
export class AuthModule {}
