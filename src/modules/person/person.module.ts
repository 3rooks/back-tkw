import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { DanModule } from '../dan/dan.module';
import { GupModule } from '../gup/gup.module';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';

@Module({
    imports: [DatabaseModule, GupModule, DanModule],
    controllers: [PersonController],
    providers: [PersonService]
})
export class PersonModule {}
