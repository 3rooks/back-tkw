import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Certificates, CertificatesSchema } from './certificates.schema';

@Schema({ _id: false })
export class Specialization {
    @Prop({ type: Boolean, default: true })
    public readonly isStudent: boolean;

    @Prop({ type: Boolean, default: false })
    public readonly isTeacher: boolean;

    @Prop({ type: Boolean, default: false })
    public readonly isRefeere: boolean;

    @Prop({ type: Boolean, default: false })
    public readonly isCoach: boolean;

    @Prop({ type: CertificatesSchema, default: {} })
    public readonly certificates: Certificates;
}

export const SpecializationSchema =
    SchemaFactory.createForClass(Specialization);
