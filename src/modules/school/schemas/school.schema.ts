import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import uuid from 'uuid-random';

export type SchoolDocument = HydratedDocument<School>;

@Schema({ _id: false, timestamps: true, versionKey: false })
export class School {
    @Prop({ unique: true, default: () => uuid() })
    _id: string;

    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ required: true })
    director: string;

    @Prop({ required: true })
    locality: string;

    @Prop({ required: true })
    province: string;

    @Prop({ required: true })
    legalEntity: string;

    @Prop({ default: true })
    isActive: boolean;
}

export const SchoolSchema = SchemaFactory.createForClass(School);
