import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post
} from '@nestjs/common';
import { DanService } from './dan.service';
import { UpdateDanDto } from './dto/update-dan.dto';

@Controller('dan')
export class DanController {
    constructor(private readonly danService: DanService) {}

    @Post()
    async create() {
        const a = await this.danService.create();
        console.log('DAN', a);
        return;
    }

    @Get()
    findAll() {
        return this.danService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.danService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDanDto: UpdateDanDto) {
        return this.danService.update(+id, updateDanDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.danService.remove(+id);
    }
}
