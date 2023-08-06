import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gup, GupDocument } from './schemas/gup.schema';

@Injectable()
export class GupService {
    constructor(
        @InjectModel(Gup.name)
        private readonly gupModel: Model<GupDocument>
    ) {}

    async create() {
        return (await this.gupModel.create({}))._id;
    }

    async findOne(id: string) {
        return await this.gupModel.findOne({ id });
    }

    async update(id: string, levelId: string, updateGupDto: object) {
        const updateFields = { [`levels.${levelId}`]: updateGupDto };
        return await this.gupModel.findByIdAndUpdate(
            id,
            {},
            {
                new: true
            }
        );
    }
}
