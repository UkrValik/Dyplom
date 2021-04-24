import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import JwtAuthGuard from 'src/auth/jwtAuth.guard';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { ComplaintsService } from './complaints.service';
import { CreateComplaintDto } from './dto';

@Controller('complaints')
export class ComplaintsController {
    constructor(private complaintsService: ComplaintsService) {}

    @Post()
    @Roles(Role.Admin, Role.Patient)
    @UseGuards(JwtAuthGuard, RolesGuard)
    create(@Body() createComplaintDto: CreateComplaintDto) {
        return this.complaintsService.create(createComplaintDto);
    }

    @Get()
    @Roles(Role.Admin, Role.Doctor)
    @UseGuards(JwtAuthGuard, RolesGuard)
    findAll() {
        return this.complaintsService.findAll();
    }
}
