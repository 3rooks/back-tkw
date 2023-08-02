import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person, PersonDocument } from './schema/person.schema';

@Injectable()
export class PersonService {
    constructor(
        @InjectModel(Person.name)
        private readonly personModel: Model<PersonDocument>
    ) {}

    create(createPersonDto: CreatePersonDto) {
        return 'This action adds a new person';
    }

    findAll() {
        return `This action returns all person`;
    }

    findOne(id: number) {
        return `This action returns a #${id} person`;
    }

    update(id: number, updatePersonDto: UpdatePersonDto) {
        return `This action updates a #${id} person`;
    }

    remove(id: number) {
        return `This action removes a #${id} person`;
    }
}
