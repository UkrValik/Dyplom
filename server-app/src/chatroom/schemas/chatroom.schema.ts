import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { UserDocument } from 'src/user/schemas/user.schema';
import { Message, MessageDocument } from './message.schema';

export type ChatroomDocument = Chatroom & mongoose.Document;

@Schema()
export class Chatroom {
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    users: UserDocument[];

    @Prop()
    messages: Message[];

    @Prop()
    created_at: string;

    @Prop()
    finished_at: string;
}

export const ChatroomSchema = SchemaFactory.createForClass(Chatroom);
