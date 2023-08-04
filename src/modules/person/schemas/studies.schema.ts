import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Dan } from 'src/modules/dan/schemas/dan.schema';
import { Gup } from 'src/modules/gup/schemas/gup.schema';

@Schema({ _id: false })
export class Studies {
    @Prop({ type: String, ref: Gup.name })
    gup: string;

    @Prop({ type: String, ref: Dan.name })
    dan: string;
}

export const StudiesSchema = SchemaFactory.createForClass(Studies);
