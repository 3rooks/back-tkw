import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class BcryptService {
    hashPassword = async (password: string): Promise<string> =>
        await hash(password, await genSalt(10));

    comparePassword = async (
        password: string,
        encrypted: string
    ): Promise<boolean> => await compare(password, encrypted);
}
