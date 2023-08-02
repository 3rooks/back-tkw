import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { BcryptModule } from 'src/lib/bcrypt/bcrypt.module';
import { ModeratorController } from './moderator.controller';
import { ModeratorService } from './moderator.service';

@Module({
    imports: [DatabaseModule, BcryptModule],
    controllers: [ModeratorController],
    providers: [ModeratorService]
})
export class ModeratorModule {}
