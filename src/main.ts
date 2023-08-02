import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validationPipe } from './config/validation-pipe';
import { swaggerConfig } from './config/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    app.useGlobalPipes(validationPipe);

    swaggerConfig(app);

    await app.listen(AppModule.port);
}

bootstrap();
