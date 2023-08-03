import { Module } from '@nestjs/common';
import { AuthGuard } from 'src/lib/auth/guards/auth.guard';
import { RolesGuard } from 'src/lib/auth/guards/roles.guard';
import { ModeratorModule } from 'src/modules/moderator/moderator.module';
import { BcryptModule } from '../bcrypt/bcrypt.module';
import { JtwModule } from '../jwt/jtw.module';
import { AuthService } from './auth.service';

@Module({
    imports: [JtwModule, BcryptModule, ModeratorModule],
    providers: [AuthService, AuthGuard, RolesGuard],
    exports: [AuthService, AuthGuard, RolesGuard]
})
export class AuthModule {}
