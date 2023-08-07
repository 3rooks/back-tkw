import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Patch,
    Post,
    Put,
    Res,
    StreamableFile,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import path, { extname, parse } from 'path';
import { Exception } from 'src/config/exception';
import { localOptions } from 'src/config/multer';
import { FILES_PATH } from 'src/utils/paths';
import uuid from 'uuid-random';
import { CreateInstituteDto } from './dto/create-institute.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateCertificateDto } from './dto/update-certificates.dto';
import { UpdateDanGupDto } from './dto/update-dan.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @HttpCode(200)
    async findOlder() {
        try {
            return {
                statusCode: 200,
                data: await this.userService.findOlder(),
                message: 'USERS data'
            };
        } catch (error) {
            throw Exception.catch(error.message);
        }
    }

    @Get('all')
    @HttpCode(200)
    async findAll() {
        try {
            return {
                statusCode: 200,
                data: await this.userService.findAll(),
                message: 'USERS data'
            };
        } catch (error) {
            throw Exception.catch(error.message);
        }
    }

    @Get(':userId')
    @HttpCode(200)
    async findById(@Param('userId') userId: string) {
        try {
            const user = await this.userService.findById(userId);

            if (!user)
                throw new Exception({
                    status: 'NOT_FOUND',
                    message: 'USER does not exist'
                });

            return {
                statusCode: 200,
                data: user,
                message: 'USER data'
            };
        } catch (error) {
            throw Exception.catch(error.message);
        }
    }

    @Post()
    @HttpCode(201)
    async createUser(@Body() bodyDto: CreateUserDto) {
        try {
            if (await this.userService.findByDni(bodyDto.dni))
                throw new Exception({
                    status: 'CONFLICT',
                    message: 'USER already exist'
                });

            return {
                statusCode: 201,
                data: await this.userService.createUser(bodyDto),
                message: 'USER created'
            };
        } catch (error) {
            throw Exception.catch(error.message);
        }
    }

    @Put(':userId/dan/:levelId')
    @HttpCode(200)
    async updateDanStudies(
        @Param('userId') userId: string,
        @Param('levelId') levelId: string,
        @Body() bodyDto: UpdateDanGupDto
    ) {
        try {
            const results = await this.userService.updateDan(
                userId,
                levelId,
                bodyDto
            );

            if (!results)
                throw new Exception({
                    status: 'NOT_FOUND',
                    message: "DAN's id does not exist"
                });

            return {
                statusCode: 200,
                data: results,
                message: 'DAN updated'
            };
        } catch (error) {
            throw Exception.catch(error.message);
        }
    }

    @Put(':userId/gup/:levelId')
    @HttpCode(200)
    async updateGupStudies(
        @Param('userId') userId: string,
        @Param('levelId') levelId: string,
        @Body() bodyDto: UpdateDanGupDto
    ) {
        try {
            const results = await this.userService.updateGup(
                userId,
                levelId,
                bodyDto
            );

            if (!results)
                throw new Exception({
                    status: 'NOT_FOUND',
                    message: "GUP's id does not exist"
                });

            return {
                statusCode: 200,
                data: results,
                message: 'GUP updated'
            };
        } catch (error) {
            throw Exception.catch(error.message);
        }
    }

    @Put(':userId/spec')
    @HttpCode(200)
    async updateSpecialization(
        @Param('userId') userId: string,
        @Body() bodyDto: UpdateSpecializationDto
    ) {
        try {
            const results = await this.userService.updateSpecialization(
                userId,
                bodyDto
            );

            if (!results)
                throw new Exception({
                    status: 'NOT_FOUND',
                    message: 'USER does not exist'
                });

            return {
                statusCode: 200,
                data: results,
                message: 'USER updated'
            };
        } catch (error) {
            throw Exception.catch(error.message);
        }
    }

    @Put(':userId/cert/:field')
    @ApiConsumes('multipart/form-data')
    @ApiParam({ name: 'userId' })
    @ApiParam({ name: 'field', enum: ['gal', 'coach', 'referee'] })
    @ApiBody({ type: UpdateCertificateDto })
    @UseInterceptors(FileInterceptor('file', localOptions))
    async updateCertificates(
        @Param('userId') userId: string,
        @Param('field') field: string,
        @UploadedFile() file: Express.Multer.File
    ) {
        try {
            if (!file)
                throw new Exception({
                    status: 'BAD_REQUEST',
                    message: 'invalid file/mimetype'
                });

            const results = await this.userService.updateCertificate(
                userId,
                field,
                file
            );

            if (!results)
                throw new Exception({
                    status: 'NOT_FOUND',
                    message: 'USER not found'
                });

            return {
                statusCode: 200,
                data: results,
                message: 'USER updated'
            };
        } catch (error) {
            throw Exception.catch(error.message);
        }
    }

    @Post('inst/:userId')
    @ApiConsumes('multipart/form-data')
    @ApiParam({ name: 'userId' })
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
            limits: { fileSize: 10000000 },
            fileFilter: (req, file, cb) => {
                // Define tus reglas de filtrado personalizadas aquí
                const allowedMimeTypes = [
                    'image/jpeg',
                    'image/png',
                    'application/pdf'
                ];

                if (!allowedMimeTypes.includes(file.mimetype)) {
                    return cb(
                        new Exception({
                            status: 'BAD_REQUEST',
                            message: 'NOT VALID '
                        }),
                        false
                    );
                }

                cb(null, true);
            }
        })
    )
    async createInstitute(
        @Param('userId') userId: string,
        @UploadedFile() file: Express.Multer.File,
        @Body() createInstituteDto: CreateInstituteDto
    ) {
        try {
            const exist = await this.userService.findById(userId);

            if (!exist)
                throw new Exception({
                    status: 'NOT_FOUND',
                    message: 'Person not exists'
                });

            const updated = await this.userService.createInstitute(userId, {
                school: createInstituteDto.school,
                started: createInstituteDto.started,
                hasDebt: createInstituteDto.hasDebt,
                date: createInstituteDto.date || null,
                form: file ? file.filename : null
            });

            return {
                statusCode: 200,
                data: updated,
                message: 'institute added'
            };
        } catch (error) {
            throw Exception.catch(error.message);
        }
    }

    @Patch('inst/:userId/:instId')
    @ApiConsumes('multipart/form-data')
    @ApiParam({ name: 'userId' })
    @ApiParam({ name: 'instId' })
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
    async updateInstitute(
        @Param('userId') userId: string,
        @Param('instId') instId: string,
        @UploadedFile() file: Express.Multer.File,
        @Body() updateUserDto: CreateInstituteDto
    ) {
        try {
            const exist = await this.userService.updateInstitute(
                userId,
                instId,
                {
                    school: updateUserDto.school,
                    started: updateUserDto.started,
                    hasDebt: updateUserDto.hasDebt,
                    date: updateUserDto.date || null,
                    form: file ? file.filename : null
                }
            );

            if (!exist)
                throw new Exception({
                    status: 'NOT_FOUND',
                    message: 'not found aaa'
                });

            return {
                statusCode: 200,
                date: exist,
                message: 'updated'
            };
        } catch (error) {
            throw Exception.catch(error.message);
        }
    }

    @Delete(':userId')
    async removeUser(@Param('userId') userId: string) {
        try {
            const results = await this.userService.removeUser(userId);

            return {
                statusCode: 200,
                data: results,
                message: 'deleted'
            };
        } catch (error) {
            throw Exception.catch(error.message);
        }
    }

    @Get('file/:fileUrl')
    async findFile(
        @Param('fileUrl') fileUrl: string,
        @Res({ passthrough: true }) res: Response
    ) {
        try {
            const filePath = path.join(FILES_PATH, fileUrl);

            const fileStream = createReadStream(filePath);

            res.set({
                'Content-Type': 'image/png',
                'Content-Disposition': `attachment; filename="${fileUrl}"`
            });

            return new StreamableFile(fileStream);
        } catch (error) {
            throw Exception.catch(error.message);
        }
    }
}
