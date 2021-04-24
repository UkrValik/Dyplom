import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as CookieParser from 'cookie-parser';
import { set } from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  set('useNewUrlParser', true);
  set('useFindAndModify', false);
  set('useCreateIndex', true);
  app.use(CookieParser());
  await app.listen(3000);
}
bootstrap();
