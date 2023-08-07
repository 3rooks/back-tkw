import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateCertificatesDto {
    @ApiProperty({ format: 'binary', required: false })
    @IsOptional()
    public readonly gal?: Express.Multer.File[];

    @ApiProperty({ format: 'binary', required: false })
    @IsOptional()
    public readonly coach?: Express.Multer.File[];

    @ApiProperty({ format: 'binary', required: false })
    @IsOptional()
    public readonly referee?: Express.Multer.File[];
}

export class CertificatesFiles {
    @ApiProperty({ format: 'binary', required: false })
    @IsOptional()
    public readonly gal?: BinaryType;

    @ApiProperty({ format: 'binary', required: false })
    @IsOptional()
    public readonly coach?: BinaryType;

    @ApiProperty({ format: 'binary', required: false })
    @IsOptional()
    public readonly referee?: BinaryType;
}
