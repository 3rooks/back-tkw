import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Certificates {
    @Prop({ type: String, default: null })
    public readonly gal: string;

    @Prop({ type: String, default: null })
    public readonly coach: string;

    @Prop({ type: String, default: null })
    public readonly referee: string;
}

export const CertificatesSchema = SchemaFactory.createForClass(Certificates);
