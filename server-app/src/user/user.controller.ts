import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import JwtAuthGuard from 'src/auth/jwtAuth.guard';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { UpdateUserDataDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('update/data')
    @Roles(Role.Doctor)
    @UseGuards(JwtAuthGuard, RolesGuard)
    updateUserData(@Body() body: UpdateUserDataDto) {
        return this.userService.updateUserDataById(body);
    }
}
