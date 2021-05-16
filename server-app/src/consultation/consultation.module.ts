import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatroomModule } from 'src/chatroom/chatroom.module';
import { Chatroom, ChatroomSchema } from 'src/chatroom/schemas/chatroom.schema';
import { Complaint, ComplaintSchema } from 'src/complaints/schemas/complaints.schema';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { UserModule } from 'src/user/user.module';
import { ConsultationController } from './consultation.controller';
import { ConsultationService } from './consultation.service';
import { Consultation, ConsultationSchema } from './schemas/consultation.schema';

@Module({
  imports: [
    UserModule,
    ChatroomModule,
    MongooseModule.forFeature([
      {name: Consultation.name, schema: ConsultationSchema},
      {name: User.name, schema: UserSchema},
      {name: Complaint.name, schema: ComplaintSchema},
      {name: Chatroom.name, schema: ChatroomSchema},
    ]),
  ],
  controllers: [ConsultationController],
  providers: [ConsultationService]
})
export class ConsultationModule {}
