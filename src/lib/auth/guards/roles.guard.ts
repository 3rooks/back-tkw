import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from 'src/constants/keys';
import { ROLES } from 'src/constants/roles';
import { ModeratorService } from 'src/modules/moderator/moderator.service';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly moderatorService: ModeratorService,
        private readonly reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext) {
        const roles = this.reflector.get<ROLES[]>(
            ROLES_KEY,
            context.getHandler()
        );

        console.log('ROLES_GUARD', roles);

        if (!roles) return true;

        const req = context.switchToHttp().getRequest<Request>();

        const mod = await this.moderatorService.findById(req.id);

        if (!roles.includes(mod.role)) return false;

        return true;
    }
}
