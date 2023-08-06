import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import uuid from 'uuid-random';

import { Institute, InstituteSchema } from './sub-schemas/institute.sub-schema';
import {
    Specialization,
    SpecializationSchema
} from './sub-schemas/specialization.schema';
import { Studies, StudiesSchema } from './sub-schemas/studies.sub-schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false })
export class User {
    @Prop({ unique: true, default: () => uuid() })
    public readonly _id: string;

    @Prop({ required: true })
    public readonly fullname: string;

    @Prop({ unique: true, required: true })
    public readonly dni: number;

    @Prop({ required: true })
    public readonly birth: Date;

    @Prop({ type: StudiesSchema, default: {} })
    public readonly studies: Studies;

    @Prop({ type: SpecializationSchema, default: {} })
    public readonly specialization: Specialization;

    @Prop({ type: [InstituteSchema] })
    public readonly institutes: Institute[];

    @Prop({ default: true })
    public readonly isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
