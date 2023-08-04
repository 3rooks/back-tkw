import { Module } from '@nestjs/common';
import { GupController } from './gup.controller';
import { GupService } from './gup.service';

@Module({
    controllers: [GupController],
    providers: [GupService],
    exports: [GupService]
})
export class GupModule {}
