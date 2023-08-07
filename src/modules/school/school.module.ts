import { Module } from '@nestjs/common';
import { AuthModule } from 'src/lib/auth/auth.module';
import { SchoolController } from './school.controller';
import { SchoolService } from './school.service';

@Module({
    imports: [AuthModule],
    controllers: [SchoolController],
    providers: [SchoolService]
})
export class SchoolModule {}
