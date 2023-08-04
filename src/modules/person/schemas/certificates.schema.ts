import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Certificates {
    @Prop({ type: String, default: null })
    gal: string;

    @Prop({ type: String, default: null })
    coach: string;

    @Prop({ type: String, default: null })
    referee: string;
}

export const CertificatesSchema = SchemaFactory.createForClass(Certificates);
