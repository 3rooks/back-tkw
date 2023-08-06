import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Exception } from 'src/config/exception';
import { CreateUserDto } from './dto/create-user.dto';
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

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        try {
            const exist = await this.userService.findByDni(createUserDto.dni);

            if (exist)
                throw new Exception({
                    status: 'CONFLICT',
                    message: 'person already exist'
                });

            const user = await this.userService.create(createUserDto);

            return {
                statusCode: 201,
                data: user,
                message: 'created'
            };
        } catch (error) {
            throw Exception.catch(error.message);
        }
    }

    @Get(':userId')
    async findOne(@Param('userId') userId: string) {
        try {
            const exist = await this.userService.findOne(userId);

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

    @Put('spec/files/:userId')
    async updateFileSpecialization() {
        try {
            console.log('');
        } catch (error) {
            throw Exception.catch(error.message);
        }
    }

    @Post('inst/:userId')
    createInstitute() {
        console.log('');
    }

    @Patch('inst/:userId')
    updateInstitute(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ) {
        return;
    }

    @Delete(':userId')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}

// @Controller('persons')
// export class PersonController {
//     constructor(private readonly personService: PersonService) {}

//     @Post('institutes/:personId')
//     @ApiConsumes('multipart/form-data')
//     @ApiParam({ name: 'personId' })
//     @ApiBody({ type: CreateInstituteDto })
//     @UseInterceptors(
//         FileInterceptor('form', {
//             storage: diskStorage({
//                 destination: FILES_PATH,
//                 filename: (req, file, cb) => {
//                     cb(
//                         null,
//                         `${parse(file.originalname).name}-${uuid()}${extname(
//                             file.originalname
//                         )}`
//                     );
//                 }
//             }),
//             limits: { fileSize: 10000000 }
//             // fileFilter: (req, file, cb) => {
//             //     if (!mimeTypes.includes(file.mimetype)) {
//             //         cb(new Error('no mimetyoe valid :|: CONFLICT'), false);
//             //     } else cb(null, true);
//             // }
//         })
//     )
//     async createInstitute(
//         @Param('personId') personId: string,
//         @UploadedFile() file: Express.Multer.File,
//         @Body() createInstituteDto: CreateInstituteDto
//     ) {
//         try {
//             const exist = await this.personService.findById(personId);

//             if (!exist)
//                 throw new Exception({
//                     status: 'NOT_FOUND',
//                     message: 'Person not exists'
//                 });

//             const updated = await this.personService.pushInstituteById(
//                 personId,
//                 {
//                     school: createInstituteDto.school,
//                     started: createInstituteDto.started,
//                     hasDebt: createInstituteDto.hasDebt,
//                     date: createInstituteDto.date || null,
//                     form: file ? file.path : null
//                 }
//             );

//             return {
//                 statusCode: 200,
//                 data: updated,
//                 message: 'institute added'
//             };
//         } catch (error) {
//             throw Exception.catch(error.message);
//         }
//     }
