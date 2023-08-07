import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Exception } from 'src/config/exception';
import { ROLES } from 'src/constants/roles';
import { AuthAccess } from 'src/lib/auth/decorators/auth.decorator';
import { RolesAccess } from 'src/lib/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/lib/auth/guards/auth.guard';
import { RolesGuard } from 'src/lib/auth/guards/roles.guard';
import { IResponse } from 'src/utils/interfaces/response.interface';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { School } from './schemas/school.schema';
import { SchoolService } from './school.service';

@ApiTags('Schools')
@Controller('schools')
@UseGuards(AuthGuard, RolesGuard)
export class SchoolController {
    constructor(private readonly schoolService: SchoolService) {}

    @Get()
    @HttpCode(200)
    async findAll(): Promise<IResponse<School[]>> {
        try {
            const data = await this.schoolService.findAll();

            return {
                statusCode: 200,
                data,
                message: 'success'
            };
        } catch (error) {
            throw Exception.catch(error.message);
        }
    }

    @Post()
    @ApiBearerAuth()
    @AuthAccess(true)
    @RolesAccess(ROLES.SUPER, ROLES.ADMIN)
    @HttpCode(201)
    async create(
        @Body() createSchoolDto: CreateSchoolDto
    ): Promise<IResponse<School>> {
        try {
            const exist = await this.schoolService.findByName(
                createSchoolDto.name
            );

            if (exist)
                throw new Exception({
                    status: 'CONFLICT',
                    message: 'school already exist'
                });

            const school = await this.schoolService.createSchool(
                createSchoolDto
            );

            return {
                statusCode: 201,
                data: school,
                message: 'school created'
            };
        } catch (error) {
            throw Exception.catch(error.message);
        }
    }

    @Put(':schoolId')
    @ApiBearerAuth()
    @ApiParam({ name: 'schoolId' })
    @AuthAccess(true)
    @RolesAccess(ROLES.SUPER, ROLES.ADMIN)
    @HttpCode(200)
    async updateSchool(
        @Param('schoolId') schoolId: string,
        @Body() updateSchoolDto: UpdateSchoolDto
    ): Promise<IResponse<School>> {
        try {
            const exist = await this.schoolService.updateSchool(
                schoolId,
                updateSchoolDto
            );

            if (!exist)
                throw new Exception({
                    status: 'NOT_FOUND',
                    message: 'school not found'
                });

            return {
                statusCode: 200,
                data: exist,
                message: 'school updated'
            };
        } catch (error) {
            throw Exception.catch(error.message);
        }
    }

    @Delete(':schoolId')
    @ApiBearerAuth()
    @ApiParam({ name: 'schoolId' })
    @AuthAccess(true)
    @RolesAccess(ROLES.SUPER, ROLES.ADMIN)
    @HttpCode(200)
    async removeSchool(
        @Param('schoolId') schoolId: string
    ): Promise<IResponse<School>> {
        try {
            const exist = await this.schoolService.removeSchool(schoolId);

            if (!exist)
                throw new Exception({
                    status: 'NOT_FOUND',
                    message: 'school not found'
                });

            return {
                statusCode: 200,
                data: exist,
                message: 'school deleted'
            };
        } catch (error) {
            throw Exception.catch(error.message);
        }
    }
}
