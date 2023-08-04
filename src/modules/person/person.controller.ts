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
}
