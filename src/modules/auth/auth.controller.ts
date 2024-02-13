import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { AuthService } from './auth.service';
import { User } from '../users/user.model';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('callback/google')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(
    @Req() req: Request & { user: User },
    // @Res({ passthrough: true }) res: Response,
  ) {
    //TODO
    // try {
    console.log(req);
    const { accessToken, refreshToken } = await this.authService.oAuthLogin(
      req.user,
    );
    // res.cookie('refresh-token', refreshToken);
    return { accessToken, refreshToken };
    //   res.redirect(`${FRONTEND_URL}/oauth?token=${token.jwt}`);
    // } catch (err: any) {
    //   res.status(500).send({ success: false, message: err.message });
    // }
  }
}
