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

    async createUser(user: CreateUserDto) {
        return await this.userModel.create({
            fullname: user.fullname,
            dni: user.dni,
            birth: user.birth,
            studies: {
                dan: danStudiesSchema,
                gup: gupStudiesSchema
            },
            specialization: { certificates: {} },
            institutes: [
                {
                    school: user.school,
                    started: user.started,
                    hasDebt: user.hasDebt,
                    transfer: {}
                }
            ],
            isActive: true
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
            { $set: { 'studies.dan.$': { ...data, _id: levelId } } },
            {
                new: true
            }
        );
    }

    async updateGup(id: string, levelId: string, data: UpdateDanGupDto) {
        const query = {
            _id: id,
            'studies.gup': { $elemMatch: { ...data, _id: levelId } }
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
        return await this.userModel.findByIdAndUpdate(
            id,
            {
                'specialization.isStudent': data.isStudent,
                'specialization.isTeacher': data.isTeacher,
                'specialization.isRefeere': data.isRefeere,
                'specialization.isCoach': data.isCoach
            },
            { new: true }
        );
    }

    async updateCertificates(userId: string, files: UpdateCertificatesDto) {
        const updateData: any = {};

        if (files.gal) {
            updateData['specialization.certificates.gal'] =
                files.gal[0].filename;
        }

        if (files.coach) {
            updateData['specialization.certificates.coach'] =
                files.coach[0].filename;
        }

        if (files.referee) {
            updateData['specialization.certificates.referee'] =
                files.referee[0].filename;
        }

        return await this.userModel.findByIdAndUpdate(
            userId,
            { $set: updateData },
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

    async updateInstitute(
        id: string,
        instId: string,
        data: CreateInstituteDto
    ) {
        const query = {
            _id: id,
            'institutes._id': instId
        };

        return await this.userModel.findOneAndUpdate(
            query,
            {
                $set: {
                    'institutes.$': {
                        school: data.school,
                        started: data.started,
                        hasDebt: data.hasDebt,
                        transfer: {
                            date: data.date,
                            form: data.form
                        },
                        _id: instId
                    }
                }
            },
            {
                new: true
            }
        );
    }

    async removeUser(id: string) {
        return await this.userModel.findByIdAndUpdate(id, {
            isActive: false
        });
    }
}
