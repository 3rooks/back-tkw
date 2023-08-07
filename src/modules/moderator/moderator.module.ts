import { Module } from '@nestjs/common';
import { BcryptModule } from 'src/lib/bcrypt/bcrypt.module';
import { JtwModule } from 'src/lib/jwt/jtw.module';
import { ModeratorController } from './moderator.controller';
import { ModeratorService } from './moderator.service';

@Module({
    imports: [BcryptModule, JtwModule],
    controllers: [ModeratorController],
    providers: [ModeratorService],
    exports: [ModeratorService, BcryptModule, JtwModule]
})
export class ModeratorModule {}
