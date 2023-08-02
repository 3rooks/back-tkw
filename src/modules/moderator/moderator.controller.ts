import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Patch,
    Post,
    Req,
    UseGuards
} from '@nestjs/common';
import { Request } from 'express';
import { Exception } from 'src/config/exception';
import { ROLES } from 'src/constants/roles';
import { IResponse } from 'src/utils/interfaces/response.interface';
import { AuthAccess } from './decorators/auth.decorator';
import { RolesAccess } from './decorators/roles.decorator';
import { CreateModeratorDto } from './dto/create-moderator.dto';
import { UpdateModeratorDto } from './dto/update-moderator.dto';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { ModeratorService } from './moderator.service';
import { Moderator } from './schemas/moderator.schema';

@Controller('moderator')
@UseGuards(AuthGuard, RolesGuard)
export class ModeratorController {
    constructor(private readonly moderatorService: ModeratorService) {}

    @Post('register')
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

    @Get()
    @AuthAccess(true)
    @RolesAccess(ROLES.ADMIN, ROLES.SUPER)
    findAll(@Req() req: Request) {
        console.log('ENTRO');
        console.log('DIIDID', req.id);
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
