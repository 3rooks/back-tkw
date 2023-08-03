import { Module } from '@nestjs/common';
import { AuthModule } from 'src/lib/auth/auth.module';
import { ModeratorModule } from '../moderator/moderator.module';
import { SchoolController } from './school.controller';
import { SchoolService } from './school.service';

@Module({
    imports: [AuthModule, ModeratorModule],
    controllers: [SchoolController],
    providers: [SchoolService]
})
export class SchoolModule {}
