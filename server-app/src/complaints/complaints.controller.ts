import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import JwtAuthGuard from 'src/auth/jwtAuth.guard';
import { ComplaintsService } from './complaints.service';
import { CreateComplaintDto } from './dto';

@Controller('complaints')
export class ComplaintsController {
    constructor(private complaintsService: ComplaintsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createComplaintDto: CreateComplaintDto) {
        return this.complaintsService.create(createComplaintDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.complaintsService.findAll();
    }
}
