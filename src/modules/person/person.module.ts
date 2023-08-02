import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';

@Module({
    imports: [DatabaseModule],
    controllers: [PersonController],
    providers: [PersonService]
})
export class PersonModule {}
