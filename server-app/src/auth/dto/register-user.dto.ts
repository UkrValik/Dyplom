import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/roles/role.enum";

export class RegisterUserDto {

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty({
        type: 'array',
        items: {
            enum: ['doctor', 'patient', 'admin'],
        }
    })
    roles: Role[];
}