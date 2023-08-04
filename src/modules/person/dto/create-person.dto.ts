import { ApiProperty } from '@nestjs/swagger';
import {
    IsDateString,
    IsISO8601,
    IsNotEmpty,
    IsNumber,
    IsString,
    Length,
    Max,
    Min
} from 'class-validator';

export class CreatePersonDto {
    @ApiProperty({ example: 'Jhon Doe' })
    @Length(2, 50, { message: 'fullname must be must be 2-50 characters' })
    @IsString({ message: 'fullname must be an string' })
    @IsNotEmpty({ message: 'property fullname should exist' })
    fullname: string;

    @ApiProperty({ example: 12345678 })
    @Max(99999999, { message: 'dni must have at most 8 digits' })
    @Min(1000000, { message: 'dni must have at least 7 digits' })
    @IsNumber({}, { message: 'dni must be a number' })
    @IsNotEmpty({ message: 'property dni should exist' })
    dni: number;

    @ApiProperty({ example: '1990-05-15T12:00:00Z' })
    @IsDateString(
        { strict: true },
        { message: 'birth must be a valid ISO date string' }
    )
    @IsISO8601({ strict: true }, { message: 'birth must be a valid ISO 8601' })
    @IsNotEmpty({ message: 'birth date should exist' })
    birth: Date;

    @ApiProperty({ example: 'Institute #11' })
    @Length(2, 50, { message: 'school must be must be 2-50 characters' })
    @IsString({ message: 'school must be an string' })
    @IsNotEmpty({ message: 'property school should exist' })
    school: string;

    @ApiProperty({ example: '2007-07-31T12:00:00Z' })
    @IsDateString(
        { strict: true },
        { message: 'started must be a valid ISO date string' }
    )
    @IsISO8601(
        { strict: true },
        { message: 'started must be a valid ISO 8601' }
    )
    @IsNotEmpty({ message: 'started date should exist' })
    started: Date;
}
