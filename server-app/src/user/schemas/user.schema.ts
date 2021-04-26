import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Complaint, ComplaintDocument } from 'src/complaints/schemas/complaints.schema';
import { Role } from 'src/roles/role.enum';

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({required: true})
    roles: Role[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Complaint' })
    complaint: ComplaintDocument;
}

export const UserSchema = SchemaFactory.createForClass(User);
