import { Module } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { ChatroomController } from './chatroom.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Chatroom, ChatroomSchema } from './schemas/chatroom.schema';
import { Message, MessageSchema } from './schemas/message.schema';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { UserModule } from 'src/user/user.module';
import { ComplaintsModule } from 'src/complaints/complaints.module';

@Module({
  imports: [
    UserModule,
    ComplaintsModule,
    MongooseModule.forFeature([
      {name: Chatroom.name, schema: ChatroomSchema},
      {name: Message.name, schema: MessageSchema},
      {name: User.name, schema: UserSchema},
    ])
  ],
  providers: [ChatroomService],
  controllers: [ChatroomController],
  exports: [ChatroomService]
})
export class ChatroomModule {}
