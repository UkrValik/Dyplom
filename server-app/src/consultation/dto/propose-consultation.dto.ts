import { ApiProperty } from "@nestjs/swagger";
import { Complaint, ComplaintDocument } from "src/complaints/schemas/complaints.schema";
import { User, UserDocument } from "src/user/schemas/user.schema";

export class ProposeConsultationDto {

    @ApiProperty({ type: Complaint })
    proposeTo: ComplaintDocument;

    @ApiProperty({ type: User })
    proposeFrom: UserDocument;
    
};