import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateDanDto } from './dto/update-dan.dto';
import { Dan, DanDocument } from './schemas/dan.schema';

@Injectable()
export class DanService {
    constructor(
        @InjectModel(Dan.name)
        private readonly danModel: Model<DanDocument>
    ) {}

    async create() {
        return await this.danModel.create({});
    }

    findAll() {
        return `This action returns all dan`;
    }

    findOne(id: number) {
        return `This action returns a #${id} dan`;
    }

    update(id: number, updateDanDto: UpdateDanDto) {
        return `This action updates a #${id} dan`;
    }

    remove(id: number) {
        return `This action removes a #${id} dan`;
    }
}
