import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsISO8601, IsNotEmpty, IsString } from 'class-validator';

export class CreateInstituteDto {
    @ApiProperty({ example: 'School #1' })
    @IsString({ message: 'school must be an string' })
    @IsNotEmpty({ message: 'school should exist' })
    public readonly school: string;

    @ApiProperty({ example: '1990-05-15T12:00:00Z' })
    @IsISO8601({ strict: true }, { message: 'date must be a valid ISO8601' })
    @IsNotEmpty({ message: 'started should exist' })
    public readonly started: Date;

    @ApiProperty()
    @IsBoolean({ message: 'has debt must be an boolean' })
    @IsNotEmpty({ message: 'has debt should exist' })
    public readonly hasDebt: boolean;
}
