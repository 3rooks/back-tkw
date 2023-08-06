import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    UploadedFiles,
    UseInterceptors
} from '@nestjs/common';
import {
    FileFieldsInterceptor,
    FileInterceptor
} from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname, parse } from 'path';
import { Exception } from 'src/config/exception';
import { FILES_PATH } from 'src/utils/paths';
import uuid from 'uuid-random';
import { CreateInstituteDto } from './dto/create-institute.dto';
import { CreateUserDto } from './dto/create-user.dto';
import {
    CertificatesFiles,
    UpdateCertificatesDto
} from './dto/update-certificates.dto';
import { UpdateDanGupDto } from './dto/update-dan.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async findOlder() {
        try {
            const results = await this.userService.findOlder();

            return {
                statusCode: 200,
                data: results,
                message: 'success'
            };
        } catch (error) {
            throw Exception.catch(error.message);
        }
    }

    @Get('all')
    async findAll() {
        try {
            const results = await this.userService.findAll();

            return {
                statusCode: 200,
                data: results,
                message: 'success'
            };
        } catch (error) {
            throw Exception.catch(error.message);
        }
    }

    @Get(':userId')
    async findById(@Param('userId') userId: string) {
        try {
            const exist = await this.userService.findById(userId);

            if (!exist)
                throw new Exception({
                    status: 'NOT_FOUND',
                    message: 'user not exists'
                });

            return {
                statusCode: 200,
                data: exist,
                message: 'data'
            };
        } catch (error) {
            throw Exception.catch(error.message);
        }
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        try {
            const exist = await this.userService.findByDni(createUserDto.dni);

            if (exist)
                throw new Exception({
                    status: 'CONFLICT',
                    message: 'person already exist'
                });

            const user = await this.userService.createUser(createUserDto);

            return {
                statusCode: 201,
                data: user,
                message: 'created'
            };
        } catch (error) {
            throw Exception.catch(error.message);
        }
    }

    @Patch(':userId/dan/:levelId')
    async updateDanStudies(
        @Param('userId') userId: string,
        @Param('levelId') levelId: string,
        @Body() updateUserDto: UpdateDanGupDto
    ) {
        try {
            const exist = await this.userService.updateDan(
                userId,
                levelId,
                updateUserDto
            );

            if (!exist)
                throw new Exception({
                    status: 'NOT_FOUND',
                    message: 'not gounfd'
                });

            return {
                statusCode: 200,
                data: exist,
                message: 'updated'
            };
        } catch (error) {
            throw Exception.catch(error.message);
        }
    }

    @Patch(':userId/gup/:levelId')
    async updateGupStudies(
        @Param('userId') userId: string,
        @Param('levelId') levelId: string,
        @Body() updateUserDto: UpdateDanGupDto
    ) {
        try {
            const exist = await this.userService.updateDan(
                userId,
                levelId,
                updateUserDto
            );

            if (!exist)
                throw new Exception({
                    status: 'NOT_FOUND',
                    message: 'not gofunds'
                });

            return {
                statusCode: 200,
                data: exist,
                message: 'updated'
            };
        } catch (error) {
            throw Exception.catch(error.message);
        }
    }

    @Put('spec/:userId')
    async updateSpecialization(
        @Param('userId') userId: string,
        @Body() updateSpecializationDto: UpdateSpecializationDto
    ) {
        try {
            const exist = await this.userService.updateSpecialization(
                userId,
                updateSpecializationDto
            );

            if (!exist)
                throw new Exception({
                    status: 'NOT_FOUND',
                    message: 'not founds'
                });

            return {
                statusCode: 200,
                data: exist,
                message: 'updated'
            };
        } catch (error) {
            throw Exception.catch(error.message);
        }
    }

    @Put('spec/cert/:userId')
    @ApiConsumes('multipart/form-data')
    @ApiParam({ name: 'userId', enum: ['gal', 'coach', 'refeere'] })
    @ApiBody({ type: CertificatesFiles })
    @UseInterceptors(
        FileFieldsInterceptor(
            [
                { name: 'gal', maxCount: 1 },
                { name: 'coach', maxCount: 1 },
                { name: 'refeere', maxCount: 1 }
            ],
            {
                dest: FILES_PATH,
                limits: {
                    fileSize: 10000000
                },
                storage: diskStorage({
                    destination: FILES_PATH,
                    filename: (req, file, cb) => {
                        cb(
                            null,
                            `${
                                parse(file.originalname).name
                            }-${uuid()}${extname(file.originalname)}`
                        );
                    }
                })
                // fileFilter: (req, file, cb) => {
                //     if (!mimeTypes.includes(file.mimetype)) {
                //         cb(new Error('no mimetyoe valid :|: CONFLICT'), false);
                //     } else cb(null, true);
                // }
            }
        )
    )
    async updateCertificates(
        @Param('userId') userId: string,
        @UploadedFiles()
        files: UpdateCertificatesDto
    ) {
        try {
            const exist = await this.userService.findById(userId);

            if (!exist)
                throw new Exception({
                    status: 'NOT_FOUND',
                    message: 'USER NOT FOUND'
                });

            const user = await this.userService.updateCertificates(
                userId,
                files
            );

            return {
                statusCode: 200,
                data: user,
                message: 'updated'
            };
        } catch (error) {
            throw Exception.catch(error.message);
        }
    }

    @Post('inst/:userId')
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
        @Param('userId') userId: string,
        @UploadedFiles() file: Express.Multer.File,
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
                form: file ? file.path : null
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
    async updateInstitute(
        @Param('userId') userId: string,
        @Param('instId') instId: string,
        @Body() updateUserDto: UpdateUserDto
    ) {
        return await this.userService.updateInstitute(userId, updateUserDto);
    }

    @Delete(':userId')
    async removeUser(@Param('userId') userId: string) {
        return await this.userService.removeUser(userId);
    }
}
