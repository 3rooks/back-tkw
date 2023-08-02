import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Exception } from 'src/config/exception';
import { JwtService } from '../jwt/jtw.service';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    verify = async (req: Request) => {
        try {
            try {
                const { authorization } = req.headers;

                if (!authorization)
                    throw new Exception({
                        status: 'UNAUTHORIZED',
                        message: 'USER UNAUTHORIZED'
                    });

                const token = req.headers.authorization.split(' ')[1];

                if (!token)
                    throw new Exception({
                        status: 'UNAUTHORIZED',
                        message: 'USER UNAUTHORIZED'
                    });

                const { id } = await this.jwtService.verifyAsync(token);

                req.id = id;

                return true;
            } catch (error) {
                throw new Exception({
                    status: 'UNAUTHORIZED',
                    message: 'USER UNAUTHORIZED'
                });
            }
        } catch (error) {
            throw Exception.catch(error.message);
        }
    };
}
