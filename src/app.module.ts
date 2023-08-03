import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Environment } from './constants/environment';
import { ModeratorModule } from './modules/moderator/moderator.module';
import { PersonModule } from './modules/person/person.module';
import { SchoolModule } from './modules/school/school.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ModeratorModule,
        PersonModule,
        SchoolModule
    ]
})
export class AppModule {
    static port: number;

    constructor(private readonly config: ConfigService) {
        AppModule.port = this.config.get<number>(Environment.PORT);
    }
}
