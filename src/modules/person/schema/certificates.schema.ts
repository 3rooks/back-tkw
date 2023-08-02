import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ _id: false })
export class Certificates {
    @ApiProperty()
    @Prop({ type: String, default: null })
    gal: string;

    @ApiProperty()
    @Prop({ type: String, default: null })
    coach: string;

    @ApiProperty()
    @Prop({ type: String, default: null })
    referee: string;
}

export const CertificatesSchema = SchemaFactory.createForClass(Certificates);
