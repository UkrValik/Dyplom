import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ComplaintDocument = Complaint & Document;

@Schema()
export class Complaint {
    @Prop()
    text: string;

    @Prop()
    doctor: string;

    @Prop()
    dateTime: string;

    @Prop()
    published: boolean;
}

export const ComplaintSchema = SchemaFactory.createForClass(Complaint);
