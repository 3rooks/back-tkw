import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Certificates } from './certificates.schema';

@Schema({ _id: false })
export class Specialization {
    @ApiProperty()
    @Prop({ type: Boolean, default: true })
    isStudent: boolean;

    @ApiProperty()
    @Prop({ type: Boolean, default: false })
    isTeacher: boolean;

    @ApiProperty()
    @Prop({ type: Boolean, default: false })
    isRefeere: boolean;

    @ApiProperty()
    @Prop({ type: Boolean, default: false })
    isCoach: boolean;

    @ApiProperty()
    @Prop({ type: Certificates })
    certificates: Certificates;
}

export const SpecializationSchema =
    SchemaFactory.createForClass(Specialization);
