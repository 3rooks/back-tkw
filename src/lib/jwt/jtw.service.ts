import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import { Environment } from 'src/constants/environment';

interface ITokenResponse extends JwtPayload {
    id: string;
    iat: number;
    exp: number;
}

interface IPayload extends JwtPayload {
    id: string;
}

@Injectable()
export class JwtService {
    private readonly options: SignOptions = {
        algorithm: 'HS512',
        expiresIn: '7d'
    };
    private readonly secret: Secret;

    constructor(private readonly config: ConfigService) {
        this.secret = this.config.get<string>(Environment.JWT_PRIVATE_KEY);
    }

    public signAsync(payload: IPayload): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            jwt.sign(payload, this.secret, this.options, (err, token) => {
                if (err) reject(err);
                else resolve(token);
            });
        });
    }

    public verifyAsync(token: string): Promise<ITokenResponse> {
        return new Promise<ITokenResponse>((resolve, reject) => {
            jwt.verify(token, this.secret, (err, payload: ITokenResponse) => {
                if (err) reject(err);
                else resolve(payload);
            });
        });
    }
}
