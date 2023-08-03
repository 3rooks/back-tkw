import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { School, SchoolDocument } from './schemas/school.schema';

@Injectable()
export class SchoolService {
    constructor(
        @InjectModel(School.name)
        private readonly moderatorModel: Model<SchoolDocument>
    ) {}

    async create(createSchoolDto: CreateSchoolDto): Promise<SchoolDocument> {
        return await this.moderatorModel.create(createSchoolDto);
    }

    async findAll() {
        return await this.moderatorModel.find().exec();
    }

    async findByName(name: string): Promise<SchoolDocument> {
        return await this.moderatorModel.findOne({ name }).exec();
    }

    async update(
        id: string,
        updateSchoolDto: UpdateSchoolDto
    ): Promise<SchoolDocument> {
        return await this.moderatorModel
            .findByIdAndUpdate(id, updateSchoolDto, { new: true })
            .exec();
    }

    async remove(id: string): Promise<SchoolDocument> {
        return await this.moderatorModel
            .findByIdAndUpdate(id, { isActive: false }, { new: true })
            .exec();
    }
}
