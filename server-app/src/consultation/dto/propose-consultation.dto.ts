import { ComplaintDocument } from "src/complaints/schemas/complaints.schema";
import { UserDocument } from "src/user/schemas/user.schema";

export class ProposeConsultationDto {
    proposeTo: ComplaintDocument;
    proposeFrom: UserDocument;
};