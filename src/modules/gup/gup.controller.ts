import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post
} from '@nestjs/common';
import { Exception } from 'src/config/exception';
import { CreateGupDto } from './dto/create-gup.dto';
import { UpdateGupDto } from './dto/update-gup.dto';
import { GupService } from './gup.service';

@Controller('gup')
export class GupController {
    constructor(private readonly gupService: GupService) {}

    @Post()
    async create(@Body() createGupDto: CreateGupDto) {
        try {
            const a = {
                first: {
                    color: 'color2',
                    teacher: 'teacher',
                    school: 'school',
                    approvedDate: new Date(),
                    isApproved: false
                    // remark: ''
                }
                // second: {
                //     color: 'color2',
                //     teacher: 'teacher',
                //     school: 'school',
                //     approvedDate: new Date(),
                //     isApproved: false,
                //     remark: ''
                // },
                // third: {
                //     color: 'color3',
                //     teacher: 'teacher',
                //     school: 'school',
                //     approvedDate: new Date(),
                //     isApproved: false,
                //     remark: ''
                // },
                // fourth: {
                //     color: 'color4',
                //     teacher: 'teacher',
                //     school: 'school',
                //     approvedDate: new Date(),
                //     isApproved: false,
                //     remark: ''
                // },
                // fifth: {
                //     color: 'color5',
                //     teacher: 'teacher',
                //     school: 'school',
                //     approvedDate: new Date(),
                //     isApproved: false,
                //     remark: ''
                // },
                // sixth: {
                //     color: 'color6',
                //     teacher: 'teacher',
                //     school: 'school',
                //     approvedDate: new Date(),
                //     isApproved: false,
                //     remark: ''
                // },
                // seventh: {
                //     color: 'color7',
                //     teacher: 'teacher',
                //     school: 'school',
                //     approvedDate: new Date(),
                //     isApproved: false,
                //     remark: ''
                // },
                // eighth: {
                //     color: 'color8',
                //     teacher: 'teacher',
                //     school: 'school',
                //     approvedDate: new Date(),
                //     isApproved: false,
                //     remark: ''
                // },
                // ninth: {
                //     color: 'color9',
                //     teacher: 'teacher',
                //     school: 'school',
                //     approvedDate: new Date(),
                //     isApproved: false,
                //     remark: ''
                // },
                // tenth: {
                //     color: 'color10',
                //     teacher: 'teacher',
                //     school: 'school',
                //     approvedDate: new Date(),
                //     isApproved: false,
                //     remark: ''
                // }
            };

            const b = await this.gupService.create(a);
            console.log('GUP', b);
            return b;
        } catch (error) {
            throw Exception.catch(error.message);
        }
    }

    @Get()
    findAll() {
        return this.gupService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.gupService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateGupDto: UpdateGupDto) {
        return this.gupService.update(+id, updateGupDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.gupService.remove(+id);
    }
}
