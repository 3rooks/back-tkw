import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import uuid from 'uuid-random';
import { GupLevel, GupLevelSchema } from './gup-level.schema';

export type GupDocument = HydratedDocument<Gup>;

@Schema({ timestamps: true, versionKey: false })
export class Gup {
    @Prop({ unique: true, default: () => uuid() })
    public readonly _id: string;

    @Prop({ type: GupLevelSchema, default: { color: 'red-black' } })
    public readonly first: GupLevel;

    @Prop({ type: GupLevelSchema, default: { color: 'red' } })
    public readonly second: GupLevel;

    @Prop({ type: GupLevelSchema, default: { color: 'blue-red' } })
    public readonly third: GupLevel;

    @Prop({ type: GupLevelSchema, default: { color: 'blue' } })
    public readonly fourth: GupLevel;

    @Prop({ type: GupLevelSchema, default: { color: 'green-blue' } })
    public readonly fifth: GupLevel;

    @Prop({ type: GupLevelSchema, default: { color: 'green' } })
    public readonly sixth: GupLevel;

    @Prop({ type: GupLevelSchema, default: { color: 'yellow-green' } })
    public readonly seventh: GupLevel;

    @Prop({ type: GupLevelSchema, default: { color: 'yellow' } })
    public readonly eighth: GupLevel;

    @Prop({ type: GupLevelSchema, default: { color: 'orange' } })
    public readonly ninth: GupLevel;

    @Prop({ type: GupLevelSchema, default: { color: 'white' } })
    public readonly tenth: GupLevel;
}

export const GupSchema = SchemaFactory.createForClass(Gup);
