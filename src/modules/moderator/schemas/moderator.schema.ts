import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ROLES } from 'src/constants/roles';
import uuid from 'uuid-random';

export type ModeratorDocument = HydratedDocument<Moderator>;

@Schema({ timestamps: true, versionKey: false })
export class Moderator {
    @Prop({ unique: true, default: () => uuid() })
    public readonly _id: string;

    @Prop({ unique: true, required: true })
    public readonly email: string;

    @Prop({ required: true })
    public readonly password: string;

    @Prop({
        type: String,
        required: true,
        enum: Object.values(ROLES)
    })
    public readonly role: ROLES;

    @Prop({ default: true })
    public readonly isActive: boolean;
}

export const ModeratorSchema = SchemaFactory.createForClass(Moderator);
