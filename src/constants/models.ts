import { Dan, DanSchema } from 'src/modules/dan/schemas/dan.schema';
import { Gup, GupSchema } from 'src/modules/gup/schemas/gup.schema';
import {
    Moderator,
    ModeratorSchema
} from 'src/modules/moderator/schemas/moderator.schema';
import { Person, PersonSchema } from 'src/modules/person/schemas/person.schema';
import { School, SchoolSchema } from 'src/modules/school/schemas/school.schema';

export const MODELS = [
    {
        name: Moderator.name,
        schema: ModeratorSchema
    },
    {
        name: Person.name,
        schema: PersonSchema
    },
    {
        name: School.name,
        schema: SchoolSchema
    },
    {
        name: Gup.name,
        schema: GupSchema
    },
    {
        name: Dan.name,
        schema: DanSchema
    }
];
