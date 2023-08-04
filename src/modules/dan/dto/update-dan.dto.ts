import { PartialType } from '@nestjs/swagger';
import { CreateDanDto } from './create-dan.dto';

export class UpdateDanDto extends PartialType(CreateDanDto) {}
