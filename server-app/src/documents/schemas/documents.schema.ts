import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { UserDocument } from 'src/user/schemas/user.schema';

export type DocumentsDocument = Documents & mongoose.Document;

@Schema()
export class Documents {
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    user: UserDocument;

    @Prop({ required: true })
    path: string;

}

export const DocumentsSchema = SchemaFactory.createForClass(Documents);
