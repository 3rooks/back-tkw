import { ApiProperty } from '@nestjs/swagger';
import {
    IsBooleanString,
    IsDateString,
    IsISO8601,
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateIf
} from 'class-validator';

export class CreateInstituteDto {
    @ApiProperty({ example: 'School #1' })
    @IsString({ message: 'school must be an string' })
    @IsNotEmpty({ message: 'school should exist' })
    public readonly school: string;

    @ApiProperty({ example: '1990-05-15T12:00:00Z' })
    @IsDateString(
        { strict: true },
        { message: 'date must be a valid ISO date string' }
    )
    @IsISO8601({ strict: true }, { message: 'date must be a valid ISO 8601' })
    @IsNotEmpty({ message: 'started should exist' })
    public readonly started: Date;

    @ApiProperty()
    @IsBooleanString({ message: 'has debt must be an boolean string' })
    @IsNotEmpty({ message: 'has debt should exist' })
    public readonly hasDebt: boolean;

    @ApiProperty({ description: 'DATE', format: 'Date', required: false })
    @IsDateString(
        { strict: true },
        { message: 'date must be a valid ISO date string' }
    )
    @IsISO8601({ strict: true }, { message: 'date must be a valid ISO 8601' })
    @ValidateIf((_, value) => value === undefined || value === null, {
        message: 'invalid DATETETET'
    })
    @IsOptional()
    public readonly date: Date | null;

    @ApiProperty({ type: String, format: 'binary', required: false })
    @IsOptional()
    public readonly form: string | null;
}
