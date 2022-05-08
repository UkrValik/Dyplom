import { Controller, Get, Post, Body, UseGuards, Req, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from 'src/auth/jwtAuth.guard';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { ComplaintsService } from './complaints.service';
import { UpdateComplaintDto } from './dto';
import { RequestWithUser } from './requestWithUser.interface';

@ApiTags('complaints')
@Controller('complaints')
export class ComplaintsController {
    constructor(private complaintsService: ComplaintsService) {}

    @Post()
    @Roles(Role.Admin, Role.Patient)
    @UseGuards(JwtAuthGuard, RolesGuard)
    updateById(@Req() request: RequestWithUser, @Body() updateComplaintDto: UpdateComplaintDto) {
        const {user} = request;
        return this.complaintsService.updateById(user.complaint._id, updateComplaintDto);
    }

    @Post('publish')
    @Roles(Role.Patient)
    @UseGuards(JwtAuthGuard, RolesGuard)
    publishById(@Req() request: RequestWithUser) {
        const {user} = request;
        const {dateTime} = request.body;
        return this.complaintsService.publishById(user.complaint._id, dateTime);
    }

    @Post('hide')
    @Roles(Role.Patient)
    @UseGuards(JwtAuthGuard, RolesGuard)
    hideById(@Req() request: RequestWithUser) {
        const {user} = request;
        return this.complaintsService.hideById(user.complaint._id);
    }

    @Get()
    @Roles(Role.Admin, Role.Doctor)
    @UseGuards(JwtAuthGuard, RolesGuard)
    findAllPublished() {
        return this.complaintsService.findAllPublished();
    }

    @Get()
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    findAll() {
        return this.complaintsService.findAll();
    }

    @Get(':id')
    @Roles(Role.Patient)
    @UseGuards(JwtAuthGuard, RolesGuard)
    findById(@Param('id') id: string) {
        return this.complaintsService.findById(id);
    }
}
