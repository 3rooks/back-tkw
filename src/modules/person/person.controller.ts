import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname, parse } from 'path';
import { Exception } from 'src/config/exception';
import { FILES_PATH } from 'src/utils/paths';
import uuid from 'uuid-random';
import { CreateInstituteDto } from './dto/create-institute.dto';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PersonService } from './person.service';

enum MimeTypes {
    JPEG = 'image/jpeg',
    PNG = 'image/png',
    GIF = 'image/gif',
    PDF = 'application/pdf'
}

const mime = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];

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

    @Post('institutes/:personId')
    async createSchool(@Param('personId') id: string, @Body() b: object) {
        return await this.personService.findInstituteById(id);
    }

    @Put('institutes/:id')
    async updateSchool(@Param('id') id: string) {
        return await this.personService.findInstituteById(id);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.personService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
        return this.personService.update(+id, updatePersonDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.personService.remove(+id);
    }

    @Post('upload')
    @ApiConsumes('multipart/form-data')
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
            //     if (!mime.includes(file.mimetype)) {
            //         cb(new Error('no mimetyoe valid :|: CONFLICT'), false);
            //     } else cb(null, true);
            // }
        })
    )
    async createInstitute(
        @UploadedFile() file: Express.Multer.File,
        @Body() body: CreateInstituteDto
    ) {
        try {
            console.log('Archivo cargado:', file);
            console.log('Datos del formulario:', body);

            return {
                message: 'Solicitud procesada correctamente.',
                body,
                file
            };
        } catch (error) {
            throw Exception.catch(error.message);
        }
    }
}
