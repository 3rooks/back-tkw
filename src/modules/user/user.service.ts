import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { danStudiesSchema, gupStudiesSchema } from 'src/constants/studies';
import { CreateUserDto } from './dto/create-user.dto';
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

    async create(createUserDto: CreateUserDto) {
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

    async findOne(id: string) {
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

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}

// @Injectable()
// export class PersonService {
//     constructor(
//         @InjectModel(Person.name)
//         private readonly personModel: Model<PersonDocument>,
//         private readonly gupService: GupService,
//         private readonly danService: DanService
//     ) {}

//     async create(createPersonDto: CreatePersonDto) {
//         return await this.personModel.create({
//             fullname: createPersonDto.fullname,
//             dni: createPersonDto.dni,
//             birth: createPersonDto.birth,
//             studies: {
//                 gup: await this.gupService.create(),
//                 dan: await this.danService.create()
//             },
//             institutes: {
//                 school: createPersonDto.school,
//                 started: createPersonDto.started
//             }
//         });
//     }

//     async findById(id: string) {
//         return await this.personModel.findById(id).exec();
//     }

//     async pushInstituteById(id: string, newInstitute: CreateInstituteDto) {
//         return await this.personModel.findByIdAndUpdate(
//             id,
//             {
//                 $push: {
//                     institutes: {
//                         school: newInstitute.school,
//                         started: newInstitute.started,
//                         hasDebt: newInstitute.hasDebt,
//                         transfer: {
//                             date: newInstitute.date,
//                             form: newInstitute.form
//                         }
//                     }
//                 }
//             },
//             { new: true }
//         );
//     }

//     async findInstituteById(instituteId: string) {
//         return await this.personModel
//             .findOne({ 'institutes._id': instituteId })
//             .exec();
//     }

//     async findAll() {
//         return await this.personModel.find().exec();
//     }

//     async findOlder() {
//         const adultAgeLimit = new Date();
//         adultAgeLimit.setFullYear(adultAgeLimit.getFullYear() - 18);

//         return await this.personModel
//             .find({ birth: { $lte: adultAgeLimit } })
//             .exec();
//     }

//     findOne(id: number) {
//         return `This action returns a #${id} person`;
//     }

//     async update(id: string, updatePersonDto: UpdatePersonDto) {
//         return await this.personModel.findByIdAndUpdate(id, updatePersonDto);
//     }

//     async remove(id: string) {
//         return await this.personModel.findByIdAndUpdate(id, {
//             isActive: false
//         });
//     }
// }
