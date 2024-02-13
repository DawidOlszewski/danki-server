import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureSwagger } from './swagger.configuration';
import cookieParser from 'cookie-parser';
import { printGoogleUrl } from './print-google-url';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true }); //TODO: change cors to specific domain
  configureSwagger(app);
  app.use(cookieParser());
  printGoogleUrl();
  await app.listen(3000);
}

bootstrap();
