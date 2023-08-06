import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Dan, DanSchema, Gup, GupSchema } from './dan-gup.sub-schema';

@Schema({ _id: false })
export class Studies {
    @Prop({ type: [DanSchema] })
    public readonly dan: Dan[];

    @Prop({ type: [GupSchema] })
    public readonly gup: Gup[];
}

export const StudiesSchema = SchemaFactory.createForClass(Studies);
