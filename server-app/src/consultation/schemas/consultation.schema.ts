import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ChatroomDocument } from 'src/chatroom/schemas/chatroom.schema';
import { ComplaintDocument } from 'src/complaints/schemas/complaints.schema';
import { UserDocument } from 'src/user/schemas/user.schema';

export type ConsultationDocument = Consultation & mongoose.Document;

@Schema()
export class Consultation {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Complaint' })
    proposeTo: ComplaintDocument;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    proposeFrom: UserDocument;

    @Prop()
    answer: boolean;

    @Prop()
    answerDate: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Chatroom'})
    chatroom: ChatroomDocument;
}

export const ConsultationSchema = SchemaFactory.createForClass(Consultation);
