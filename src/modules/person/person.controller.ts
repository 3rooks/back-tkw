import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
    ApiBody,
    ApiConsumes,
    ApiOperation,
    ApiParam,
    ApiTags
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname, parse } from 'path';
import { Exception } from 'src/config/exception';
import { FILES_PATH } from 'src/utils/paths';
import uuid from 'uuid-random';
import { CreateInstituteDto } from './dto/create-institute.dto';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PersonService } from './person.service';

@ApiTags('Persons')
@Controller('persons')
export class PersonController {
    constructor(private readonly personService: PersonService) {}

    @Get()
    findOlder() {
        return this.personService.findOlder();
    }

    @Get('all')
    findAll() {
        return this.personService.findAll();
    }

    @Post()
    async create(@Body() createPersonDto: CreatePersonDto) {
        try {
            const exist = await this.personService.findByDni(
                createPersonDto.dni
            );

            if (exist)
                throw new Exception({
                    status: 'CONFLICT',
                    message: 'person already exist'
                });

            const person = await this.personService.create(createPersonDto);

            return {
                statusCode: 201,
                data: person,
                message: 'person created'
            };
        } catch (error) {
            throw Exception.catch(error.message);
        }
    }

    @Get(':personId')
    @ApiParam({ name: 'personId' })
    async findOne(@Param('personId') personId: string) {
        return await this.personService.findById(personId);
    }

    @Put(':personId')
    async update(
        @Param('id') personId: string,
        @Body() updatePersonDto: UpdatePersonDto
    ) {
        return await this.personService.update(personId, updatePersonDto);
    }

    @Delete(':personId')
    async remove(@Param('personId') personId: string) {
        return await this.personService.remove(personId);
    }

    @Put('specializations/:personId')
    @ApiParam({ name: 'personId' })
    async updateSpecialization() {
        return {};
    }

    @Post('institutes/:personId')
    @ApiConsumes('multipart/form-data')
    @ApiParam({ name: 'personId' })
    @ApiBody({ type: CreateInstituteDto })
    @UseInterceptors(
        FileInterceptor('form', {
            storage: diskStorage({
                destination: FILES_PATH,
                filename: (req, file, cb) => {
                    cb(
                        null,
                        `${parse(file.originalname).name}-${uuid()}${extname(
                            file.originalname
                        )}`
                    );
                }
            }),
            limits: { fileSize: 10000000 }
            // fileFilter: (req, file, cb) => {
            //     if (!mimeTypes.includes(file.mimetype)) {
            //         cb(new Error('no mimetyoe valid :|: CONFLICT'), false);
            //     } else cb(null, true);
            // }
        })
    )
    async createInstitute(
        @Param('personId') personId: string,
        @UploadedFile() file: Express.Multer.File,
        @Body() createInstituteDto: CreateInstituteDto
    ) {
        try {
            const exist = await this.personService.findById(personId);

            if (!exist)
                throw new Exception({
                    status: 'NOT_FOUND',
                    message: 'Person not exists'
                });

            const updated = await this.personService.pushInstituteById(
                personId,
                {
                    school: createInstituteDto.school,
                    started: createInstituteDto.started,
                    hasDebt: createInstituteDto.hasDebt,
                    date: createInstituteDto.date || null,
                    form: file ? file.path : null
                }
            );

            return {
                statusCode: 200,
                data: updated,
                message: 'institute added'
            };
        } catch (error) {
            throw Exception.catch(error.message);
        }
    }

    @ApiOperation({ summary: 'Update an institute' })
    @Put('institutes/:personId/:instituteId')
    @ApiParam({ name: 'personId' })
    @ApiParam({ name: 'instituteId' })
    async updateInstitute() {
        return {};
    }

    @Get('file/:personId')
    async findFile() {
        return {};
    }
}
