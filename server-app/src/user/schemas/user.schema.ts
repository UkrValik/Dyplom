import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/roles/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({required: true})
    roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
