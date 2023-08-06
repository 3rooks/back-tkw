import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsISO8601,
    IsNotEmpty,
    IsNumber,
    IsString,
    Length,
    Max,
    Min
} from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'Jhon Doe' })
    @Length(2, 50, { message: 'fullname must be must be 2-50 characters' })
    @IsString({ message: 'fullname must be an string' })
    @IsNotEmpty({ message: 'property fullname should exist' })
    public readonly fullname: string;

    @ApiProperty({ example: 12345678 })
    @Max(99999999, { message: 'dni must have at most 8 digits' })
    @Min(1000000, { message: 'dni must have at least 7 digits' })
    @IsNumber({}, { message: 'dni must be a number' })
    @IsNotEmpty({ message: 'property dni should exist' })
    public readonly dni: number;

    @ApiProperty({ example: '1990-05-15T12:00:00Z' })
    @IsISO8601({ strict: true }, { message: 'birth must be a valid ISO8601' })
    @IsNotEmpty({ message: 'birth date should exist' })
    public readonly birth: Date;

    @ApiProperty({ example: 'Institute #11' })
    @Length(2, 50, { message: 'school must be must be 2-50 characters' })
    @IsString({ message: 'school must be an string' })
    @IsNotEmpty({ message: 'property school should exist' })
    public readonly school: string;

    @ApiProperty({ example: '2007-07-31T12:00:00Z' })
    @IsISO8601({ strict: true }, { message: 'started must be a valid ISO8601' })
    @IsNotEmpty({ message: 'started date should exist' })
    public readonly started: Date;

    @ApiProperty({ example: false })
    @IsBoolean({ message: 'has debt must be an boolean' })
    @IsNotEmpty({ message: 'has debt should exist' })
    public readonly hasDebt: boolean;
}
