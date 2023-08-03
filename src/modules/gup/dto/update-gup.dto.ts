import { PartialType } from '@nestjs/swagger';
import { CreateGupDto } from './create-gup.dto';

export class UpdateGupDto extends PartialType(CreateGupDto) {}
