import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import uuid from 'uuid-random';
import {
    SchoolHistory,
    SchoolHistorySchema
} from './sub-schemas/school-history.schema';
import {
    Specialization,
    SpecializationSchema
} from './sub-schemas/specialization.schema';
import { Studies, StudiesSchema } from './sub-schemas/studies.schema';

export type PersonDocument = HydratedDocument<Person>;

@Schema({ timestamps: true, versionKey: false })
export class Person {
    @Prop({ unique: true, default: () => uuid() })
    public readonly _id: string;

    @Prop({ type: String, required: true })
    public readonly fullname: string;

    @Prop({ type: Number, unique: true, required: true })
    public readonly dni: number;

    @Prop({ type: Date, required: true })
    public readonly birth: Date;

    @Prop({ type: StudiesSchema, default: {} })
    public readonly studies: Studies;

    @Prop({ type: SpecializationSchema, default: {} })
    public readonly specialization: Specialization;

    @Prop({ type: [SchoolHistorySchema] })
    public readonly institutes: SchoolHistory[];

    @Prop({ type: Boolean, default: true })
    public readonly isActive: boolean;
}

export const PersonSchema = SchemaFactory.createForClass(Person);
