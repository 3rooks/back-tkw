import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import uuid from 'uuid-random';
import { SchoolHistory, SchoolHistorySchema } from './school-history.schema';
import { Specialization } from './specialization.schema';

export type PersonDocument = HydratedDocument<Person>;

@Schema({ _id: false, timestamps: true, versionKey: false })
export class Person {
    @Prop({ unique: true, default: () => uuid() })
    public readonly _id?: string;

    @Prop({ type: String, required: true })
    fullname: string;

    @Prop({ type: Number, required: true })
    dni: number;

    @Prop({ type: Date, required: true })
    birth: Date;

    @Prop({ type: String })
    studies: string;

    @Prop({ type: Specialization })
    specialization: Specialization;

    @Prop({ type: [SchoolHistorySchema] })
    institutes: SchoolHistory[];
}

export const PersonSchema = SchemaFactory.createForClass(Person);
