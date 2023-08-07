import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Exception } from 'src/config/exception';
import { IResponse } from 'src/utils/interfaces/response.interface';
import { LoginModeratorDto } from './dto/login-moderator.dto';
import { RegisterModeratorDto } from './dto/register-moderator.dto';
import { ModeratorService } from './moderator.service';
import { Moderator } from './schemas/moderator.schema';

@ApiTags('Moderators')
@Controller('moderators')
export class ModeratorController {
    constructor(private readonly moderatorService: ModeratorService) {}

    @Post('login')
    @HttpCode(200)
    async login(
        @Body() loginModeratorDto: LoginModeratorDto
    ): Promise<IResponse<string>> {
        try {
            const exist = await this.moderatorService.findByEmail(
                loginModeratorDto.email
            );

            if (!exist || !exist.isActive)
                throw new Exception({
                    status: 'UNAUTHORIZED',
                    message: 'user unauthorized'
                });

            const isEqual = await this.moderatorService.checkPassword(
                loginModeratorDto.password,
                exist.password
            );

            if (!isEqual)
                throw new Exception({
                    status: 'UNAUTHORIZED',
                    message: 'user unauthorized'
                });

            const token = await this.moderatorService.generateToken(exist._id);

            return {
                statusCode: 200,
                data: token,
                message: 'token'
            };
        } catch (error) {
            throw Exception.catch(error.message);
        }
    }

    @Post('register')
    @HttpCode(201)
    async register(
        @Body() createModeratorDto: RegisterModeratorDto
    ): Promise<IResponse<Moderator>> {
        try {
            const exist = await this.moderatorService.findByEmail(
                createModeratorDto.email
            );

            if (exist)
                throw new Exception({
                    status: 'CONFLICT',
                    message: 'moderator already exists'
                });

            const moderator = await this.moderatorService.create(
                createModeratorDto
            );

            return {
                statusCode: 201,
                data: moderator,
                message: 'moderator created'
            };
        } catch (error) {
            throw Exception.catch(error.message);
        }
    }
}
