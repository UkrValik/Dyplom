import { Role } from "src/roles/role.enum";

export class RegisterUserDto {
    email: string;
    password: string;
    roles: Role[];
}