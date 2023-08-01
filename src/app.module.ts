import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Environment } from './constants/environment';
import { DatabaseModule } from './database/database.module';
import { ModeratorModule } from './modules/moderator/moderator.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        ModeratorModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {
    static port: number;

    constructor(private readonly config: ConfigService) {
        AppModule.port = this.config.get<number>(Environment.PORT);
    }
}
