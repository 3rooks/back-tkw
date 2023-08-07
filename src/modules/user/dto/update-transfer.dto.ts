import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNotEmpty } from 'class-validator';

export class UpdateTransferDto {
    @ApiProperty({ example: '1990-05-15T12:00:00Z', required: true })
    @IsISO8601({ strict: true }, { message: 'date must be a valid ISO8601' })
    @IsNotEmpty({ message: 'date should exist' })
    public readonly date: Date;

    @ApiProperty({ format: 'binary', required: true })
    public readonly form: BinaryType;
}
