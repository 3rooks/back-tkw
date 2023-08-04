import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PersonService } from './person.service';

@ApiTags('Persons')
@Controller('persons')
export class PersonController {
    constructor(private readonly personService: PersonService) {}

    @Post()
    async create() {
        const a = {
            fullname: 'asdasda',
            dni: 945498798,
            birth: new Date(),
            studies: {
                gup: 'GUP_MODEL',
                dan: 'DAN_MODEL'
            },
            institutes: {
                school: 'asdasdas',
                started: new Date()
            }
        };

        const b = await this.personService.create(a);

        console.log('person', b);
        return;
    }

    @Get()
    findAll() {
        return this.personService.findAll();
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
