import { Module } from '@nestjs/common';
import { AuthGuard } from 'src/lib/auth/guards/auth.guard';
import { RolesGuard } from 'src/lib/auth/guards/roles.guard';
import { ModeratorModule } from 'src/modules/moderator/moderator.module';
import { AuthService } from './auth.service';

@Module({
    imports: [ModeratorModule],
    providers: [AuthService, AuthGuard, RolesGuard],
    exports: [AuthService, AuthGuard, RolesGuard, ModeratorModule]
})
export class AuthModule {}
