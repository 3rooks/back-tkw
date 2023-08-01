import { Injectable } from '@nestjs/common';
import { CreateModeratorDto } from './dto/create-moderator.dto';
import { UpdateModeratorDto } from './dto/update-moderator.dto';

@Injectable()
export class ModeratorService {
    create(createModeratorDto: CreateModeratorDto) {
        return 'This action adds a new moderator';
    }

    findAll() {
        return `This action returns all moderator`;
    }

    findOne(id: number) {
        return `This action returns a #${id} moderator`;
    }

    update(id: number, updateModeratorDto: UpdateModeratorDto) {
        return `This action updates a #${id} moderator`;
    }

    remove(id: number) {
        return `This action removes a #${id} moderator`;
    }
}
