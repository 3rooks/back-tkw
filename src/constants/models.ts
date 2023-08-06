import {
    Moderator,
    ModeratorSchema
} from 'src/modules/moderator/schemas/moderator.schema';
import { School, SchoolSchema } from 'src/modules/school/schemas/school.schema';
import { User, UserSchema } from 'src/modules/user/schemas/user.schema';

export const MODELS = [
    {
        name: Moderator.name,
        schema: ModeratorSchema
    },
    {
        name: School.name,
        schema: SchoolSchema
    },
    {
        name: User.name,
        schema: UserSchema
    }
];
