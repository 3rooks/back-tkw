import {
    Dan,
    Gup
} from 'src/modules/user/schemas/sub-schemas/dan-gup.sub-schema';

type DanLevel = Pick<Dan, 'level'>;
type GupColor = Pick<Gup, 'color'>;

export const danStudiesSchema: DanLevel[] = [
    {
        level: '1st'
    },
    {
        level: '2nd'
    },
    {
        level: '3rd'
    },
    {
        level: '4th'
    },
    {
        level: '5th'
    },
    {
        level: '6th'
    },
    {
        level: '7th'
    },
    {
        level: '8th'
    },
    {
        level: '9th'
    },
    {
        level: '10th'
    }
];

export const gupStudiesSchema: GupColor[] = [
    {
        color: 'red-black'
    },
    {
        color: 'red'
    },
    {
        color: 'blue-red'
    },
    {
        color: 'blue'
    },
    {
        color: 'green-blue'
    },
    {
        color: 'green'
    },
    {
        color: 'yellow-green'
    },
    {
        color: 'yellow'
    },
    {
        color: 'orange'
    },
    {
        color: 'white'
    }
];
