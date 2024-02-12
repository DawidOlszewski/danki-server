import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureSwagger } from './swagger.configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true }); //TODO: change cors to specific domain
  configureSwagger(app);

  await app.listen(3000);
}
bootstrap();
