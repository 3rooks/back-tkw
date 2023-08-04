import { Module } from '@nestjs/common';
import { DanController } from './dan.controller';
import { DanService } from './dan.service';

@Module({
    controllers: [DanController],
    providers: [DanService],
    exports: [DanService]
})
export class DanModule {}
