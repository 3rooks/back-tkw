import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
    IsStrongPassword
} from 'class-validator';
import { ROLES } from 'src/constants/roles';

export class CreateModeratorDto {
    @IsEmail({}, { message: 'email must comply RFC 5322' })
    @IsString({ message: 'email must be an string' })
    @IsNotEmpty({ message: 'property email should exist' })
    public readonly email: string;

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

    @IsEnum(Object.values(ROLES), { message: 'role must be an valid role' })
    @IsString({ message: 'role must be an string' })
    @IsNotEmpty({ message: 'property role should exist' })
    public readonly role: string;
}
