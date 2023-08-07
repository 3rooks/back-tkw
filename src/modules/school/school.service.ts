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

    async findAll(): Promise<SchoolDocument[]> {
        return await this.moderatorModel.find().exec();
    }

    async findByName(name: string): Promise<SchoolDocument> {
        return await this.moderatorModel.findOne({ name }).exec();
    }

    async createSchool(
        createSchoolDto: CreateSchoolDto
    ): Promise<SchoolDocument> {
        return await this.moderatorModel.create(createSchoolDto);
    }

    async updateSchool(
        schoolId: string,
        updateSchoolDto: UpdateSchoolDto
    ): Promise<SchoolDocument> {
        return await this.moderatorModel
            .findByIdAndUpdate(schoolId, updateSchoolDto, { new: true })
            .exec();
    }

    async removeSchool(schoolId: string): Promise<SchoolDocument> {
        return await this.moderatorModel
            .findByIdAndUpdate(schoolId, { isActive: false }, { new: true })
            .exec();
    }
}
