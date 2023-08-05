import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DanService } from '../dan/dan.service';
import { GupService } from '../gup/gup.service';
import { CreateInstituteDto } from './dto/create-institute.dto';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person, PersonDocument } from './schemas/person.schema';

@Injectable()
export class PersonService {
    constructor(
        @InjectModel(Person.name)
        private readonly personModel: Model<PersonDocument>,
        private readonly gupService: GupService,
        private readonly danService: DanService
    ) {}

    async create(createPersonDto: CreatePersonDto) {
        return await this.personModel.create({
            fullname: createPersonDto.fullname,
            dni: createPersonDto.dni,
            birth: createPersonDto.birth,
            studies: {
                gup: await this.gupService.create(),
                dan: await this.danService.create()
            },
            institutes: {
                school: createPersonDto.school,
                started: createPersonDto.started
            }
        });
    }

    async findByDni(dni: number) {
        return await this.personModel.findOne({ dni }).exec();
    }

    async findById(id: string) {
        return await this.personModel.findById(id).exec();
    }

    async pushInstituteById(id: string, newInstitute: CreateInstituteDto) {
        return await this.personModel.findByIdAndUpdate(
            id,
            {
                $push: {
                    institutes: {
                        school: newInstitute.school,
                        started: newInstitute.started,
                        hasDebt: newInstitute.hasDebt,
                        transfer: {
                            date: newInstitute.date,
                            form: newInstitute.form
                        }
                    }
                }
            },
            { new: true }
        );
    }

    async findInstituteById(instituteId: string) {
        return await this.personModel
            .findOne({ 'institutes._id': instituteId })
            .exec();
    }

    async findAll() {
        return await this.personModel.find().exec();
    }

    async findOlder() {
        const adultAgeLimit = new Date();
        adultAgeLimit.setFullYear(adultAgeLimit.getFullYear() - 18);

        return await this.personModel
            .find({ birth: { $lte: adultAgeLimit } })
            .exec();
    }

    findOne(id: number) {
        return `This action returns a #${id} person`;
    }

    async update(id: string, updatePersonDto: UpdatePersonDto) {
        return await this.personModel.findByIdAndUpdate(id, updatePersonDto);
    }

    async remove(id: string) {
        return await this.personModel.findByIdAndUpdate(id, {
            isActive: false
        });
    }
}
