import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BcryptService } from 'src/lib/bcrypt/bcrypt.service';
import { JwtService } from 'src/lib/jwt/jtw.service';
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

    async generateToken(id: string): Promise<string> {
        return await this.jwtService.signAsync({ id });
    }

    async create(mod: RegisterModeratorDto): Promise<ModeratorDocument> {
        return await this.moderatorModel.create({
            ...mod,
            password: await this.bcryptService.hashPassword(mod.password)
        });
    }

    async checkPassword(password: string, encripted: string): Promise<boolean> {
        return await this.bcryptService.comparePassword(password, encripted);
    }

    async findByEmail(email: string): Promise<ModeratorDocument> {
        return await this.moderatorModel.findOne({ email }).exec();
    }

    async findById(id: string): Promise<ModeratorDocument> {
        return await this.moderatorModel.findById(id).exec();
    }
}
