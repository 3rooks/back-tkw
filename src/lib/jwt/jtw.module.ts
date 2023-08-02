import { Module } from '@nestjs/common';
import { JwtService } from './jtw.service';

@Module({
    providers: [JwtService],
    exports: [JwtService]
})
export class JtwModule {}
