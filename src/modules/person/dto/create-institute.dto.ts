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

export class CreateInstituteDto {
    @ApiProperty()
    public readonly school: string;

    @ApiProperty()
    public readonly started: Date;

    @ApiProperty()
    public readonly hasDebt?: boolean;

    @ApiProperty()
    public readonly date?: Date;

    @ApiProperty()
    public readonly form?: string;
}
