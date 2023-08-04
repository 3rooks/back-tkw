import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class DanLevel {
    @Prop({ required: true })
    level: string;

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

export const DanLevelSchema = SchemaFactory.createForClass(DanLevel);
