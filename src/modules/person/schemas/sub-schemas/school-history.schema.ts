import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import uuid from 'uuid-random';
import { Transfer, TransferSchema } from './transfer.schema';

@Schema()
export class SchoolHistory {
    @Prop({ unique: true, default: () => uuid() })
    public readonly _id: string;

    @Prop({ type: String, required: true })
    public readonly school: string;

    @Prop({ type: Date, required: true })
    public readonly started: Date;

    @Prop({ type: Boolean, default: false })
    public readonly hasDebt: boolean;

    @Prop({ type: TransferSchema, default: {} })
    public readonly transfer: Transfer;
}

export const SchoolHistorySchema = SchemaFactory.createForClass(SchoolHistory);
