import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Transfer {
    @Prop({ type: Date, default: null })
    public readonly date: Date;

    @Prop({ type: String, default: null })
    public readonly form: string;
}

export const TransferSchema = SchemaFactory.createForClass(Transfer);
