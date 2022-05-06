import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as CookieParser from 'cookie-parser';
import { set } from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  set('useNewUrlParser', true);
  set('useFindAndModify', false);
  set('useCreateIndex', true);
  app.use(CookieParser());

  const config = new DocumentBuilder()
    .setTitle('Doctor App API')
    .setDescription('...description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
