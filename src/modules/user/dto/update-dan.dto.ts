import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsISO8601,
    IsNotEmpty,
    IsOptional,
    IsString,
    Length
} from 'class-validator';
import { Base } from '../schemas/sub-schemas/dan-gup.sub-schema';

export class UpdateDanGupDto implements Base {
    @ApiProperty({ example: 'Juan Topo' })
    @Length(2, 50, { message: 'teacher must be must be 2-50 characters' })
    @IsString({ message: 'teacher must be an string' })
    @IsNotEmpty({ message: 'teacher should exist' })
    public readonly teacher: string;

    @ApiProperty({ example: 'School #23' })
    @Length(2, 50, { message: 'school must be must be 2-50 characters' })
    @IsString({ message: 'school must be an string' })
    @IsNotEmpty({ message: 'school should exist' })
    public readonly school: string;

    @ApiProperty({ example: '1990-05-15T12:00:00Z' })
    @IsISO8601(
        { strict: true },
        { message: 'approved date must be a valid ISO8601' }
    )
    @IsNotEmpty({ message: 'approved date should exist' })
    public readonly approvedDate: Date;

    @ApiProperty({ example: true })
    @IsBoolean({ message: 'is approved must be an boolean' })
    @IsNotEmpty({ message: 'is approved should exist' })
    public readonly isApproved: boolean;

    @ApiProperty({ example: 'optional', required: false })
    @Length(2, 1000, { message: 'remark must be must be 2-1000 characters' })
    @IsString({ message: 'remark must be an string' })
    @IsOptional()
    public readonly remark?: string;
}
