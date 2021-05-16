import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { ChatroomModule } from 'src/chatroom/chatroom.module';
import { ComplaintsModule } from 'src/complaints/complaints.module';
import { ComplaintsService } from 'src/complaints/complaints.service';
import { ComplaintSchema } from 'src/complaints/schemas/complaints.schema';
import { User, UserDocument, UserSchema } from 'src/user/schemas/user.schema';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { ChatGateway } from './chat.gateway';

@Module({
    imports: [
        AuthModule, UserModule, ComplaintsModule, ConfigModule, ChatroomModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
              secret: configService.get('JWT_SECRET'),
              signOptions: {
                expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
              },
            }),
          }),
    ],
    providers: [ChatGateway],
})

export class ChatModule {}
