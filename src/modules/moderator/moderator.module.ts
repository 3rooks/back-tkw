import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/lib/auth/auth.module';
import { BcryptModule } from 'src/lib/bcrypt/bcrypt.module';
import { ModeratorController } from './moderator.controller';
import { ModeratorService } from './moderator.service';

@Module({
    imports: [DatabaseModule, BcryptModule, AuthModule],
    controllers: [ModeratorController],
    providers: [ModeratorService],
    exports: []
})
export class ModeratorModule {}
