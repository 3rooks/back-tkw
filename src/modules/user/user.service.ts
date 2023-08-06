import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { danStudiesSchema, gupStudiesSchema } from 'src/constants/studies';
import { CreateInstituteDto } from './dto/create-institute.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateCertificatesDto } from './dto/update-certificates.dto';
import { UpdateDanGupDto } from './dto/update-dan.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>
    ) {}

    async findOlder(): Promise<UserDocument[]> {
        const adultAgeLimit = new Date();
        adultAgeLimit.setFullYear(adultAgeLimit.getFullYear() - 18);

        return await this.userModel
            .find({ birth: { $lte: adultAgeLimit } })
            .exec();
    }

    async findAll(): Promise<UserDocument[]> {
        return await this.userModel.find().exec();
    }

    async findByDni(dni: number) {
        return await this.userModel.findOne({ dni }).exec();
    }

    async createUser(createUserDto: CreateUserDto) {
        return await this.userModel.create({
            fullname: createUserDto.fullname,
            dni: createUserDto.dni,
            birth: createUserDto.birth,
            studies: {
                dan: danStudiesSchema,
                gup: gupStudiesSchema
            },
            institutes: [
                {
                    school: createUserDto.school,
                    started: createUserDto.started,
                    hasDebt: createUserDto.hasDebt
                }
            ]
        });
    }

    async findById(id: string) {
        return await this.userModel.findById(id);
    }

    async updateDan(id: string, levelId: string, data: UpdateDanGupDto) {
        const query = {
            _id: id,
            'studies.dan': { $elemMatch: { _id: levelId } }
        };

        return await this.userModel.findOneAndUpdate(
            query,
            { $set: { 'studies.dan.$': data } },
            {
                new: true
            }
        );
    }

    async updateGup(id: string, levelId: string, data: UpdateDanGupDto) {
        const query = {
            _id: id,
            'studies.gup': { $elemMatch: { _id: levelId } }
        };

        return await this.userModel.findOneAndUpdate(
            query,
            { $set: { 'studies.gup.$': data } },
            {
                new: true
            }
        );
    }

    async updateSpecialization(id: string, data: UpdateSpecializationDto) {
        return await this.userModel.findByIdAndUpdate(id, data);
    }

    async updateCertificates(userId: string, files: UpdateCertificatesDto) {
        if (files.gal) {
            return await this.userModel.findByIdAndUpdate(
                userId,
                {
                    'specialization.certificates': {
                        gal: files.gal[0].path
                    }
                },
                { new: true }
            );
        }

        // gal
        // coach
        // ref
        // gal y coach
        // gal y ref
        // coach ref

        return await this.userModel.findByIdAndUpdate(
            userId,
            {
                'specialization.certificates': {
                    gal: files.gal[0].path,
                    coach: files.coach[0].path,
                    refeere: files.refeere[0].path
                }
            },
            { new: true }
        );
    }

    async createInstitute(id: string, newInstitute: CreateInstituteDto) {
        return await this.userModel.findByIdAndUpdate(
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

    async updateInstitute(id: string, data: object) {
        return await this.userModel.findByIdAndUpdate(id, data, { new: true });
    }

    async removeUser(id: string) {
        return await this.userModel.findByIdAndUpdate(id, {
            isActive: false
        });
    }
}
