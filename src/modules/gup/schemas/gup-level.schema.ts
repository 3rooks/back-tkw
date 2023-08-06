import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import uuid from 'uuid-random';

@Schema()
export class GupLevel {
    @Prop({ default: () => uuid() })
    public readonly _id?: string;

    @Prop({ required: true })
    public readonly color: string;

    @Prop({ default: null })
    public readonly teacher: string;

    @Prop({ default: null })
    public readonly school: string;

    @Prop({ default: null })
    public readonly approvedDate: Date;

    @Prop({ default: false })
    public readonly isApproved: boolean;

    @Prop({ default: null })
    public readonly remark: string;
}

export const GupLevelSchema = SchemaFactory.createForClass(GupLevel);

export const a: GupLevel = {
    color: '',
    teacher: '',
    school: '',
    approvedDate: new Date(),
    isApproved: false,
    remark: ''
};

type GupLevelWithoutColor = Omit<GupLevel, 'color'>;
