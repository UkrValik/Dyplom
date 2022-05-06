import { ApiProperty } from "@nestjs/swagger";

export class UpdateComplaintDto {

    @ApiProperty()
    text: string;

    @ApiProperty()
    doctor: string;

    @ApiProperty()
    dateTime: string;

    @ApiProperty()
    published: boolean;
    
}