import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComplaintsModule } from './complaints/complaints.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { ChatModule } from './chat/chat.module';
import { ConsultationModule } from './consultation/consultation.module';
import { ChatroomModule } from './chatroom/chatroom.module';
import { DocumentsModule } from './documents/documents.module';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    ComplaintsModule,
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    RolesModule,
    ChatModule,
    ConsultationModule,
    ChatroomModule,
    DocumentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
