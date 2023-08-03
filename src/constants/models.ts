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
    }
];
