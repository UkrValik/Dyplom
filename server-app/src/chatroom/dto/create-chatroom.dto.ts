import { ApiProperty } from "@nestjs/swagger";
import { User, UserDocument } from "src/user/schemas/user.schema";

export class CreateChatroomDto {

    @ApiProperty({ type: [User] })
    users: UserDocument[];

}