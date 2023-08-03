import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Environment } from 'src/constants/environment';
import { MODELS } from 'src/constants/models';

@Global()
@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: (config: ConfigService) => ({
                uri: config.get<string>(Environment.MONGO_URI),
                useNewUrlParser: true,
                useUnifiedTopology: true
            }),
            inject: [ConfigService]
        }),
        MongooseModule.forFeature(MODELS)
    ],
    exports: [MongooseModule]
})
export class DatabaseModule {}
