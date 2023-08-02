import {
    Moderator,
    ModeratorSchema
} from 'src/modules/moderator/schemas/moderator.schema';

export const MODELS = [
    {
        name: Moderator.name,
        schema: ModeratorSchema
    }
];
