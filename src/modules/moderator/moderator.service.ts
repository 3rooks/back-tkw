import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BcryptService } from 'src/lib/bcrypt/bcrypt.service';
import { CreateModeratorDto } from './dto/create-moderator.dto';
import { UpdateModeratorDto } from './dto/update-moderator.dto';
import { Moderator, ModeratorDocument } from './schemas/moderator.schema';

@Injectable()
export class ModeratorService {
    constructor(
        @InjectModel(Moderator.name)
        private readonly moderatorModel: Model<ModeratorDocument>,
        private readonly bcryptService: BcryptService
    ) {}

    create = async (
        createModeratorDto: CreateModeratorDto
    ): Promise<ModeratorDocument> => {
        return await this.moderatorModel.create({
            ...createModeratorDto,
            password: await this.bcryptService.hashPassword(
                createModeratorDto.password
            )
        });
    };

    findAll() {
        return `This action returns all moderator`;
    }

    findOne(id: number) {
        return `This action returns a #${id} moderator`;
    }

    findByEmail = async (email: string) => {
        return await this.moderatorModel.findOne({ email }).exec();
    };

    findById = async (id: string) => {
        return await this.moderatorModel.findById(id).exec();
    };

    update(id: number, updateModeratorDto: UpdateModeratorDto) {
        return `This action updates a #${id} moderator`;
    }

    remove(id: number) {
        return `This action removes a #${id} moderator`;
    }
}
