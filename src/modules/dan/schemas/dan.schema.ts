import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import uuid from 'uuid-random';
import { DanLevel, DanLevelSchema } from './dan-level.schema';

export type DanDocument = HydratedDocument<Dan>;

@Schema({ timestamps: true, versionKey: false })
export class Dan {
    @Prop({ unique: true, default: () => uuid() })
    public readonly _id: string;

    @Prop({ type: DanLevelSchema, default: { level: '1st' } })
    public readonly first: DanLevel;

    @Prop({ type: DanLevelSchema, default: { level: '2nd' } })
    public readonly second: DanLevel;

    @Prop({ type: DanLevelSchema, default: { level: '3rd' } })
    public readonly third: DanLevel;

    @Prop({ type: DanLevelSchema, default: { level: '4th' } })
    public readonly fourth: DanLevel;

    @Prop({ type: DanLevelSchema, default: { level: '5th' } })
    public readonly fifth: DanLevel;

    @Prop({ type: DanLevelSchema, default: { level: '6th' } })
    public readonly sixth: DanLevel;

    @Prop({ type: DanLevelSchema, default: { level: '7th' } })
    public readonly seventh: DanLevel;

    @Prop({ type: DanLevelSchema, default: { level: '8th' } })
    public readonly eighth: DanLevel;

    @Prop({ type: DanLevelSchema, default: { level: '9th' } })
    public readonly ninth: DanLevel;

    @Prop({ type: DanLevelSchema, default: { level: '10th' } })
    public readonly tenth: DanLevel;
}

export const DanSchema = SchemaFactory.createForClass(Dan);
