import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsStrongPassword
} from 'class-validator';

export class LoginModeratorDto {
    @ApiProperty()
    @IsEmail({}, { message: 'email must comply RFC 5322' })
    @IsString({ message: 'email must be an string' })
    @IsNotEmpty({ message: 'property email should exist' })
    public readonly email: string;

    @ApiProperty()
    @IsStrongPassword(
        {
            minLength: 8,
            minNumbers: 1,
            minUppercase: 1,
            minSymbols: 0
        },
        {
            message:
                'password must be at least 8 characters long and include at least one number and one capital letter'
        }
    )
    @IsString({ message: 'password must be an string' })
    @IsNotEmpty({ message: 'property password should exist' })
    public readonly password: string;
}
