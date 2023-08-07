import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { danStudiesSchema, gupStudiesSchema } from 'src/constants/studies';
import { CreateInstituteDto } from './dto/create-institute.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateDanGupDto } from './dto/update-dan.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';
import { UpdateTransferDto } from './dto/update-transfer.dto';
import { Dan, Gup } from './schemas/sub-schemas/dan-gup.sub-schema';
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

    async findByDni(dni: number): Promise<UserDocument> {
        return await this.userModel.findOne({ dni }).exec();
    }

    async createUser(user: CreateUserDto): Promise<UserDocument> {
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

    async findById(userId: string): Promise<UserDocument> {
        return await this.userModel.findById(userId).exec();
    }

    async updateDan(
        userId: string,
        levelId: string,
        bodyDto: UpdateDanGupDto
    ): Promise<UserDocument> {
        const query = {
            _id: userId,
            'studies.dan': { $elemMatch: { _id: levelId } }
        };

        const update: Omit<Dan, 'level'> = {
            _id: levelId,
            teacher: bodyDto.teacher,
            school: bodyDto.school,
            approvedDate: bodyDto.approvedDate,
            isApproved: bodyDto.isApproved,
            remark: bodyDto.remark || null
        };

        return await this.userModel.findOneAndUpdate(
            query,
            { $set: { 'studies.dan.$': { ...update } } },
            {
                new: true
            }
        );
    }

    async updateGup(
        userId: string,
        levelId: string,
        bodyDto: UpdateDanGupDto
    ): Promise<UserDocument> {
        const query = {
            _id: userId,
            'studies.gup': { $elemMatch: { _id: levelId } }
        };

        const update: Omit<Gup, 'color'> = {
            _id: levelId,
            teacher: bodyDto.teacher,
            school: bodyDto.school,
            approvedDate: bodyDto.approvedDate,
            isApproved: bodyDto.isApproved,
            remark: bodyDto.remark || null
        };

        return await this.userModel.findOneAndUpdate(
            query,
            { $set: { 'studies.gup.$': { ...update } } },
            {
                new: true
            }
        );
    }

    async updateSpecialization(
        userId: string,
        bodyDto: UpdateSpecializationDto
    ) {
        const update = {
            'specialization.isStudent': bodyDto.isStudent,
            'specialization.isTeacher': bodyDto.isTeacher,
            'specialization.isRefeere': bodyDto.isRefeere,
            'specialization.isCoach': bodyDto.isCoach
        };

        return await this.userModel.findByIdAndUpdate(
            { _id: userId },
            { $set: { ...update } },
            { new: true }
        );
    }

    async updateCertificate(
        userId: string,
        field: string,
        files: Express.Multer.File
    ) {
        const updateField = `specialization.certificates.${field}`;

        return await this.userModel.findOneAndUpdate(
            { _id: userId },
            { $set: { [updateField]: files.filename } },
            { new: true }
        );
    }

    async createInstitute(userId: string, bodyDto: CreateInstituteDto) {
        const create = {
            school: bodyDto.school,
            started: bodyDto.started,
            hasDebt: bodyDto.hasDebt,
            transfer: {}
        };

        return await this.userModel.findByIdAndUpdate(
            { _id: userId },
            { $push: { institutes: create } },
            { new: true }
        );
    }

    async updateInstitute(
        userId: string,
        instId: string,
        bodyDto: CreateInstituteDto
    ) {
        const query = {
            _id: userId,
            'institutes._id': instId
        };

        const update = {
            _id: userId,
            'institutes.$.school': bodyDto.school,
            'institutes.$.started': bodyDto.started,
            'institutes.$.hasDebt': bodyDto.hasDebt
        };

        return await this.userModel.findOneAndUpdate(
            query,
            { $set: { ...update } },
            { new: true }
        );
    }

    async updateTransfer(
        userId: string,
        instId: string,
        file: Express.Multer.File,
        bodyDto: UpdateTransferDto
    ) {
        const query = {
            _id: userId,
            'institutes._id': instId
        };

        const update = {
            'institutes.$.transfer.date': bodyDto.date,
            'institutes.$.transfer.form': file.filename
        };

        return await this.userModel.findOneAndUpdate(
            query,
            { $set: { ...update } },
            { new: true }
        );
    }

    async removeUser(id: string) {
        return await this.userModel.findByIdAndUpdate(id, {
            isActive: false
        });
    }
}
