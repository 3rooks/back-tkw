import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import uuid from 'uuid-random';

@Schema()
export class Base {
    @Prop({ default: null })
    public readonly teacher: string;

    @Prop({ default: null })
    public readonly school: string;

    @Prop({ default: null })
    public readonly approvedDate: Date;

    @Prop({ default: false })
    public readonly isApproved: boolean;

    @Prop({ default: null })
    public readonly remark?: string;
}

@Schema()
export class Dan extends Base {
    @Prop({ unique: true, default: () => uuid() })
    public readonly _id: string;

    @Prop({ required: true })
    public readonly level: string;
}

@Schema()
export class Gup extends Base {
    @Prop({ unique: true, default: () => uuid() })
    public readonly _id: string;

    @Prop({ required: true })
    public readonly color: string;
}

export const DanSchema = SchemaFactory.createForClass(Dan);
export const GupSchema = SchemaFactory.createForClass(Gup);
