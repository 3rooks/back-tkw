import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transfer } from './transfer.schema';

@Schema({ _id: false })
export class SchoolHistory {
    @ApiProperty()
    @Prop({ type: String, required: true })
    school: string;

    @ApiProperty()
    @Prop({ type: Date, required: true })
    started: Date;

    @ApiProperty()
    @Prop({ type: Boolean, default: false })
    hasDebt: boolean;

    @ApiProperty()
    @Prop({ type: Transfer })
    transfer: Transfer;
}

export const SchoolHistorySchema = SchemaFactory.createForClass(SchoolHistory);
