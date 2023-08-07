import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateCertificateDto {
    @ApiProperty({ format: 'binary', required: true })
    @IsNotEmpty({ message: 'file should exist' })
    public readonly file: BinaryType;
}
