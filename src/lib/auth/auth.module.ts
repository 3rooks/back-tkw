import { Module } from '@nestjs/common';
import { JtwModule } from '../jwt/jtw.module';
import { AuthService } from './auth.service';

@Module({
    imports: [JtwModule],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}
