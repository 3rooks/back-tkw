import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BcryptService } from 'src/lib/bcrypt/bcrypt.service';
import { JwtService } from 'src/lib/jwt/jtw.service';
import { LoginModeratorDto } from './dto/login-moderator.dto';
import { RegisterModeratorDto } from './dto/register-moderator.dto';
import { Moderator, ModeratorDocument } from './schemas/moderator.schema';

@Injectable()
export class ModeratorService {
    constructor(
        @InjectModel(Moderator.name)
        private readonly moderatorModel: Model<ModeratorDocument>,
        private readonly bcryptService: BcryptService,
        private readonly jwtService: JwtService
    ) {}

    generateToken = async (id: string) => {
        return await this.jwtService.signAsync({ id });
    };

    create = async (
        createModeratorDto: RegisterModeratorDto
    ): Promise<ModeratorDocument> => {
        return await this.moderatorModel.create({
            ...createModeratorDto,
            password: await this.bcryptService.hashPassword(
                createModeratorDto.password
            )
        });
    };

    checkPassword = async (password: string, encripted: string) => {
        return await this.bcryptService.comparePassword(password, encripted);
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

    update(id: number, updateModeratorDto: LoginModeratorDto) {
        return `This action updates a #${id} moderator`;
    }

    remove(id: number) {
        return `This action removes a #${id} moderator`;
    }
}
