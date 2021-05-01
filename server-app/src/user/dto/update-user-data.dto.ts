import { ObjectId } from "mongoose";

export class UpdateUserDataDto {
    firstname: string;
    lastname: string;
    _id: ObjectId;
}