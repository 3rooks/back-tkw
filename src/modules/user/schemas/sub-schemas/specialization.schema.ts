import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Certificates {
    @Prop({ default: null })
    public readonly gal: string;

    @Prop({ default: null })
    public readonly coach: string;

    @Prop({ default: null })
    public readonly referee: string;
}

export const CertificatesSchema = SchemaFactory.createForClass(Certificates);

@Schema({ _id: false })
export class Specialization {
    @Prop({ default: true })
    public readonly isStudent: boolean;

    @Prop({ default: false })
    public readonly isTeacher: boolean;

    @Prop({ default: false })
    public readonly isRefeere: boolean;

    @Prop({ default: false })
    public readonly isCoach: boolean;

    @Prop({ type: CertificatesSchema })
    public readonly certificates: Certificates;
}

export const SpecializationSchema =
    SchemaFactory.createForClass(Specialization);
