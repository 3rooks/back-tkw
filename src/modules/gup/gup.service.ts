import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateGupDto } from './dto/update-gup.dto';
import { Gup, GupDocument } from './schemas/gup.schema';

@Injectable()
export class GupService {
    constructor(
        @InjectModel(Gup.name)
        private readonly gupModel: Model<GupDocument>
    ) {}

    async create(createGupDto: object) {
        console.log('CREATE');
        return await this.gupModel.create({});
    }

    findAll() {
        return `This action returns all gup`;
    }

    findOne(id: number) {
        return `This action returns a #${id} gup`;
    }

    update(id: number, updateGupDto: UpdateGupDto) {
        return `This action updates a #${id} gup`;
    }

    remove(id: number) {
        return `This action removes a #${id} gup`;
    }
}
