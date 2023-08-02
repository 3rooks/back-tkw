import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ _id: false })
export class Transfer {
    @ApiProperty()
    @Prop({ type: Date, default: null })
    date: Date;

    @ApiProperty()
    @Prop({ type: String, default: null })
    form: string;
}

export const TransferSchema = SchemaFactory.createForClass(Transfer);
