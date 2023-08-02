import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AUTH_KEY } from 'src/constants/keys';
import { AuthService } from 'src/lib/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext) {
        const required = this.reflector.get<boolean>(
            AUTH_KEY,
            context.getHandler()
        );

        console.log('AUTH_GUARD', required);

        if (!required) return true;

        return await this.authService.verify(
            context.switchToHttp().getRequest<Request>()
        );
    }
}
