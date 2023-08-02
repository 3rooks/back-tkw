import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/lib/auth/auth.module';
import { BcryptModule } from 'src/lib/bcrypt/bcrypt.module';
import { JtwModule } from 'src/lib/jwt/jtw.module';
import { ModeratorController } from './moderator.controller';
import { ModeratorService } from './moderator.service';

@Module({
    imports: [DatabaseModule, BcryptModule, AuthModule, JtwModule],
    controllers: [ModeratorController],
    providers: [ModeratorService],
    exports: []
})
export class ModeratorModule {}
