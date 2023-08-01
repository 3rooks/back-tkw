import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post
} from '@nestjs/common';
import { CreateModeratorDto } from './dto/create-moderator.dto';
import { UpdateModeratorDto } from './dto/update-moderator.dto';
import { ModeratorService } from './moderator.service';

@Controller('moderator')
export class ModeratorController {
    constructor(private readonly moderatorService: ModeratorService) {}

    @Post()
    create(@Body() createModeratorDto: CreateModeratorDto) {
        return this.moderatorService.create(createModeratorDto);
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
