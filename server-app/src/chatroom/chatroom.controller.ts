import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from 'src/auth/jwtAuth.guard';
import { RequestWithUser } from 'src/complaints/requestWithUser.interface';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { ChatroomService } from './chatroom.service';

@ApiTags('chatroom')
@Controller('chatroom')
export class ChatroomController {
    constructor(
        private chatroomService: ChatroomService
    ) {}

    @Get('all-user-chats')
    @Roles(Role.Doctor, Role.Patient)
    @UseGuards(JwtAuthGuard, RolesGuard)
    getAllByUser(@Req() request: RequestWithUser) {
        const {user} = request;
        return this.chatroomService.findByUser(user);
    }
}
