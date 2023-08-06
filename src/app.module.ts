import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Environment } from './constants/environment';
import { ModeratorModule } from './modules/moderator/moderator.module';
import { SchoolModule } from './modules/school/school.module';
import { UserModule } from './modules/user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ModeratorModule,
        SchoolModule,
        UserModule
    ]
})
export class AppModule {
    static port: number;

    constructor(private readonly config: ConfigService) {
        AppModule.port = this.config.get<number>(Environment.PORT);
    }
}
