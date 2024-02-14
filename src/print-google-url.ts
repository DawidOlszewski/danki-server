import getenv from 'getenv';
import { google } from 'googleapis';

export function printGoogleUrl() {
  const oauth2Client = new google.auth.OAuth2(
    getenv('GOOGLE_OAUTH_ID'),
    getenv('GOOGLE_OAUTH_SECRET'),
    'http://localhost:3000/auth/callback/google',
  );

  const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ];

  const authorizationUrl: string = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    include_granted_scopes: true,
  });

  console.log(authorizationUrl);
}
