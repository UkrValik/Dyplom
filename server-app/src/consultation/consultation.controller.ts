import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import JwtAuthGuard from 'src/auth/jwtAuth.guard';
import { RequestWithUser } from 'src/complaints/requestWithUser.interface';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { ConsultationService } from './consultation.service';
import { PatientAnswerDto, ProposeConsultationDto } from './dto';

@Controller('consultation')
export class ConsultationController {
    constructor(private consultationService: ConsultationService) {}

    @Post()
    @Roles(Role.Doctor)
    @UseGuards(JwtAuthGuard, RolesGuard)
    propose(@Body() proposeConsultationDto: ProposeConsultationDto) {
        return this.consultationService.propose(proposeConsultationDto);
    }

    @Get()
    @Roles(Role.Patient)
    @UseGuards(JwtAuthGuard, RolesGuard)
    findProposals(@Req() request: RequestWithUser) {
        const {user} = request;
        return this.consultationService.findProposals(user.complaint);
    }

    @Post('answer')
    @Roles(Role.Patient)
    @UseGuards(JwtAuthGuard, RolesGuard)
    patientAnswer(@Body() patientAnswerDto: PatientAnswerDto) {
        return this.consultationService.patientAnswer(patientAnswerDto);
    }
}
