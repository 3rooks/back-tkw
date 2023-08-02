import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validationPipe } from './config/validation-pipe';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    app.useGlobalPipes(validationPipe);

    await app.listen(AppModule.port);
}

bootstrap();
