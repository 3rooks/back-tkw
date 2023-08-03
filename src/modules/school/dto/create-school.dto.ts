import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateSchoolDto {
    @ApiProperty()
    @Length(2, 50, { message: 'name must be must be 2-50 characters' })
    @IsString({ message: 'name must be an string' })
    @IsNotEmpty({ message: 'property name should exist' })
    public readonly name: string;

    @ApiProperty()
    @Length(2, 50, { message: 'director must be must be 2-50 characters' })
    @IsString({ message: 'director must be an string' })
    @IsNotEmpty({ message: 'property director should exist' })
    public readonly director: string;

    @ApiProperty()
    @Length(2, 50, { message: 'locality must be must be 2-50 characters' })
    @IsString({ message: 'locality must be an string' })
    @IsNotEmpty({ message: 'property locality should exist' })
    public readonly locality: string;

    @ApiProperty()
    @Length(2, 50, { message: 'province must be must be 2-50 characters' })
    @IsString({ message: 'province must be an string' })
    @IsNotEmpty({ message: 'property province should exist' })
    public readonly province: string;

    @ApiProperty()
    @Length(2, 50, { message: 'legal entity must be must be 2-50 characters' })
    @IsString({ message: 'legal entity must be an string' })
    @IsNotEmpty({ message: 'property legal entity should exist' })
    public readonly legalEntity: string;
}
