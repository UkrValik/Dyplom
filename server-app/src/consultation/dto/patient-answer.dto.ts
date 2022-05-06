import { ApiProperty } from "@nestjs/swagger";

export class PatientAnswerDto {

    @ApiProperty()
    answer: boolean;

    @ApiProperty()
    consult_id: string;

    @ApiProperty()
    doctor_id: string;

    @ApiProperty()
    patient_id: string;
    
}