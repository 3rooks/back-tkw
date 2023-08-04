import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Certificates, CertificatesSchema } from './certificates.schema';

@Schema({ _id: false })
export class Specialization {
    @Prop({ type: Boolean, default: true })
    isStudent: boolean;

    @Prop({ type: Boolean, default: false })
    isTeacher: boolean;

    @Prop({ type: Boolean, default: false })
    isRefeere: boolean;

    @Prop({ type: Boolean, default: false })
    isCoach: boolean;

    @Prop({ type: CertificatesSchema, default: {} })
    certificates: Certificates;
}

export const SpecializationSchema =
    SchemaFactory.createForClass(Specialization);
