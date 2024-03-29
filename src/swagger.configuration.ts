import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';

export function configureSwagger(app: INestApplication) {
  patchNestJsSwagger();
  const config = new DocumentBuilder()
    .setTitle('Danki')
    .setDescription('Amazing Danki')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
