import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transfer, TransferSchema } from './transfer.schema';

@Schema({ _id: false })
export class SchoolHistory {
    @Prop({ type: String, required: true })
    school: string;

    @Prop({ type: Date, required: true })
    started: Date;

    @Prop({ type: Boolean, default: false })
    hasDebt: boolean;

    @Prop({ type: TransferSchema, default: {} })
    transfer: Transfer;
}

export const SchoolHistorySchema = SchemaFactory.createForClass(SchoolHistory);
