import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class GupLevel {
    @Prop({ required: true })
    color: string;

    @Prop({ default: null })
    teacher: string;

    @Prop({ default: null })
    school: string;

    @Prop({ default: null })
    approvedDate: Date;

    @Prop({ default: false })
    isApproved: boolean;

    @Prop({ default: null })
    remark: string;
}

export const GupLevelSchema = SchemaFactory.createForClass(GupLevel);
