import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureSwagger } from './swagger.configuration';
import cookieParser from 'cookie-parser';
import { google } from 'googleapis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true }); //TODO: change cors to specific domain
  configureSwagger(app);
  app.use(cookieParser());
  await app.listen(3000);

  const YOUR_CLIENT_ID =
    '777794280584-9ofa3ul724h1oku3sqv2fc0rmn9k9jql.apps.googleusercontent.com';

  const YOUR_CLIENT_SECRET = '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';
  /**
   * To use OAuth2 authentication, we need access to a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI
   * from the client_secret.json file. To get these credentials for your application, visit
   * https://console.cloud.google.com/apis/credentials.
   */
  const oauth2Client = new google.auth.OAuth2(
    YOUR_CLIENT_ID,
    YOUR_CLIENT_SECRET,
    'http://localhost:3000/auth/callback/google',
  );

  // Access scopes for read-only Drive activity.
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ];

  // Generate a url that asks permissions for the Drive activity scope
  const authorizationUrl: string = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
    /** Pass in the scopes array defined above.
     * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
    scope: scopes,
    // Enable incremental authorization. Recommended as a best practice.
    include_granted_scopes: true,
  });

  console.log(authorizationUrl);
}
bootstrap();
