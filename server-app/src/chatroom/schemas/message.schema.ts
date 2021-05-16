import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { UserDocument } from 'src/user/schemas/user.schema';

export type MessageDocument = Message & mongoose.Document;

@Schema()
export class Message {
    @Prop()
    message: string;

    @Prop()
    date: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: UserDocument;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
