import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Patch,
    Post
} from '@nestjs/common';
import { Exception } from 'src/config/exception';
import { IResponse } from 'src/utils/interfaces/response.interface';
import { CreateModeratorDto } from './dto/create-moderator.dto';
import { UpdateModeratorDto } from './dto/update-moderator.dto';
import { ModeratorService } from './moderator.service';
import { Moderator } from './schemas/moderator.schema';

@Controller('moderator')
export class ModeratorController {
    constructor(private readonly moderatorService: ModeratorService) {}

    @Post()
    @HttpCode(201)
    async create(
        @Body() createModeratorDto: CreateModeratorDto
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

            const mod = await this.moderatorService.create(createModeratorDto);

            return {
                statusCode: 201,
                data: mod.toObject({ useProjection: true }),
                message: 'moderator created'
            };
        } catch (error) {
            throw Exception.catch(error.message);
        }
    }

    @Get()
    findAll() {
        return this.moderatorService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.moderatorService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateModeratorDto: UpdateModeratorDto
    ) {
        return this.moderatorService.update(+id, updateModeratorDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.moderatorService.remove(+id);
    }
}
