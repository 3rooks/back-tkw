import { Module } from '@nestjs/common';
import { DanController } from './dan.controller';
import { DanService } from './dan.service';

@Module({
    controllers: [DanController],
    providers: [DanService]
})
export class DanModule {}
