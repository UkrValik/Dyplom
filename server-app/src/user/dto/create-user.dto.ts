import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/roles/role.enum";

export class CreateUserDto {

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty({  })
    roles: Role[];
}