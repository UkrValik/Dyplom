import { UserDocument } from "src/user/schemas/user.schema";

export class CreateChatroomDto {
    users: UserDocument[];
}