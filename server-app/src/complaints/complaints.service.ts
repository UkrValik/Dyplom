import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Complaint, ComplaintDocument } from './schemas/complaints.schema';
import { CreateComplaintDto } from './dto/create-complaint.dto';

@Injectable()
export class ComplaintsService {
    constructor(@InjectModel(Complaint.name) private complaintModel: Model<ComplaintDocument>) {}

    async create(createComplaintDto: CreateComplaintDto): Promise<Complaint> {
        const createdComplaint = new this.complaintModel(createComplaintDto);
        return createdComplaint.save();
    }

    findAll(): Promise<Complaint[]> {
        return this.complaintModel.find().exec();
    }
}
