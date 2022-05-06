import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatroomService } from 'src/chatroom/chatroom.service';
import { CreateChatroomDto } from 'src/chatroom/dto';
import { ComplaintDocument } from 'src/complaints/schemas/complaints.schema';
import { UserService } from 'src/user/user.service';
import { PatientAnswerDto, ProposeConsultationDto } from './dto';
import { ConsultationStatusEnum } from './enums/consultation-status.enum';
import { Consultation, ConsultationDocument } from './schemas/consultation.schema';

@Injectable()
export class ConsultationService {
    constructor(
        @InjectModel(Consultation.name) private consultationModel: Model<ConsultationDocument>,
        private userService: UserService,
        private chatroomService: ChatroomService,
        ) {}

    public async propose(proposeConsultationDto: ProposeConsultationDto) {
        const createdConsultation = new this.consultationModel({ ...proposeConsultationDto, status: ConsultationStatusEnum.PENDING });
        return createdConsultation.save();
    }

    public async findProposals(complaint: ComplaintDocument) {
        const consultations = await this.consultationModel.find({proposeTo: complaint}).exec();
        let doctors = [];
        for (let consultation of consultations) {
            const doctor = await this.userService.getById(consultation.proposeFrom._id);
            doctor.password = undefined;
            doctors.push({...doctor, consultation: consultation});
        }
        return doctors;
    }

    public async patientAnswer(patientAnswerDto: PatientAnswerDto) {
        const doctor = await this.userService.getById(patientAnswerDto.doctor_id);
        const patient = await this.userService.getById(patientAnswerDto.patient_id);
        if (patientAnswerDto.answer) {
            const chatroom = await this.chatroomService.create({users: [doctor, patient]});
            return this.consultationModel.findOneAndUpdate({
                _id: patientAnswerDto.consult_id,
            }, {
                answer: patientAnswerDto.answer,
                answerDate: new Date().toISOString(),
                chatroom: chatroom,
                status: ConsultationStatusEnum.APROVED,
            });
        } else {
            return this.consultationModel.findOneAndUpdate({
                _id: patientAnswerDto.consult_id,
            }, {
                answer: patientAnswerDto.answer,
                answerDate: new Date().toISOString(),
                status: ConsultationStatusEnum.REJECTED,
            });
        }
    }

    public async finishConsultation(id: string) {
        const consultation = await this.consultationModel.findOneAndUpdate({
            _id: id,
        }, {
            status: ConsultationStatusEnum.FINISHED,
        });
        await this.chatroomService.findOneAndUpdate({
            _id: consultation.chatroom,
        }, {
            finished_at: () => new Date().toISOString(),
        });
    }

}
