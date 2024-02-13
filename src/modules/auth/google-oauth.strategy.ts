import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth2';
import { Identity } from './identity.model';
import { UsersService } from '../users/users.service';
import { Profile } from 'passport';
import getenv from 'getenv';
import { CreateUserDto } from '../users/dtos/create-user.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(Identity) private identityModel: typeof Identity,
    private usersService: UsersService,
  ) {
    super({
      clientID: getenv('GOOGLE_ID'),
      clientSecret: getenv('GOOGLE_SECRET'),
      callbackURL: 'http://localhost:3000/auth/callback/google',
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ): Promise<any> {
    const { id: providerId, name, emails } = profile;

    let identity = await this.identityModel
      .query()
      .findById(['google', providerId])
      .withGraphFetched({ user: true }); //TODO: and google to enum

    let user = identity?.user;

    if (identity) {
      return { id: user!.id };
    }

    console.log(providerId, name, emails);

    user = await this.usersService.createUser({
      email: emails![0].value,
      username: `${name!.givenName} ${name!.familyName}`,
      createdAtString: new Date().toISOString(),
      updatedAtString: new Date().toISOString(), //TODO: mend it
    } as CreateUserDto);

    console.log(user);

    identity = await this.identityModel
      .query()
      .insert({ provider: 'google', providerId, userId: user.id });

    return user;
  }
}
