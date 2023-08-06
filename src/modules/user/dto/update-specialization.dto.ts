import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateSpecializationDto {
    @ApiProperty({ example: true })
    @IsBoolean({ message: 'is student must be an boolean' })
    @IsNotEmpty({ message: 'is student should exist' })
    public readonly isStudent: boolean;

    @ApiProperty({ example: true })
    @IsBoolean({ message: 'is teacher must be an boolean' })
    @IsNotEmpty({ message: 'is teacher should exist' })
    public readonly isTeacher: boolean;

    @ApiProperty({ example: true })
    @IsBoolean({ message: 'is refeere must be an boolean' })
    @IsNotEmpty({ message: 'is refeere should exist' })
    public readonly isRefeere: boolean;

    @ApiProperty({ example: true })
    @IsBoolean({ message: 'is coach must be an boolean' })
    @IsNotEmpty({ message: 'is coach should exist' })
    public readonly isCoach: boolean;
}
