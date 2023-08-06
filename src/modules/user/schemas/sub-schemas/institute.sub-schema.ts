import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import uuid from 'uuid-random';

@Schema({ _id: false })
export class Transfer {
    @Prop({ default: null })
    public readonly date: Date;

    @Prop({ default: null })
    public readonly form: string;
}

export const TransferSchema = SchemaFactory.createForClass(Transfer);

@Schema()
export class Institute {
    @Prop({ unique: true, default: () => uuid() })
    public readonly _id: string;

    @Prop({ required: true })
    public readonly school: string;

    @Prop({ required: true })
    public readonly started: Date;

    @Prop({ required: true })
    public readonly hasDebt: boolean;

    @Prop({ type: TransferSchema, default: {} })
    public readonly transfer: Transfer;
}

export const InstituteSchema = SchemaFactory.createForClass(Institute);
