import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateGupDto } from './dto/update-gup.dto';
import { GupService } from './gup.service';

@ApiTags('Gups')
@Controller('gups')
export class GupController {
    constructor(private readonly gupService: GupService) {}

    @Get(':gupId')
    async findOne(@Param('gupId') gupId: string) {
        return await this.gupService.findOne(gupId);
    }

    @Put(':gupId/:levelId')
    update(
        @Param('gupId') gupId: string,
        @Param('levelId') levelId: string,
        @Body() updateGupDto: UpdateGupDto
    ) {
        return {};
    }
}
