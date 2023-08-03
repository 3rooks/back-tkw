import { ValidateNested } from 'class-validator';

export interface ILevel {
    color?: string;
    teacher?: string;
    school?: string;
    approvedDate?: Date;
    isApproved?: boolean;
    remark?: string;
}

export class CreateGupDto {
    @ValidateNested()
    first: ILevel;

    @ValidateNested()
    second: ILevel;

    @ValidateNested()
    third: ILevel;

    @ValidateNested()
    fourth: ILevel;

    @ValidateNested()
    fifth: ILevel;

    @ValidateNested()
    sixth: ILevel;

    @ValidateNested()
    seventh: ILevel;

    @ValidateNested()
    eighth: ILevel;

    @ValidateNested()
    ninth: ILevel;

    @ValidateNested()
    tenth: ILevel;
}
