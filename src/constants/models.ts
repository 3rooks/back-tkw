import {
    Moderator,
    ModeratorSchema
} from 'src/modules/moderator/schemas/moderator.schema';
import { Person, PersonSchema } from 'src/modules/person/schema/person.schema';

export const MODELS = [
    {
        name: Moderator.name,
        schema: ModeratorSchema
    },
    {
        name: Person.name,
        schema: PersonSchema
    }
];
