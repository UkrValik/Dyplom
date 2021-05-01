import { Model, ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Complaint, ComplaintDocument } from './schemas/complaints.schema';
import { UpdateComplaintDto } from './dto/update-complaint.dto';

@Injectable()
export class ComplaintsService {
    constructor(@InjectModel(Complaint.name) private complaintModel: Model<ComplaintDocument>) {}

    async create(complaintObj: any): Promise<Complaint> {
        const createdComplaint = new this.complaintModel(complaintObj);
        return createdComplaint.save();
    }

    async updateById(complaintId: ObjectId, updateComplaintDto: UpdateComplaintDto): Promise<Complaint> {
        return this.complaintModel.findByIdAndUpdate(complaintId, updateComplaintDto);
    }

    async publishById(complaintId: ObjectId, dateTime: string) {
        return this.complaintModel.findByIdAndUpdate(complaintId, {published: true, dateTime});
    }

    async hideById(complaintId: ObjectId) {
        return this.complaintModel.findByIdAndUpdate(complaintId, {published: false});
    }

    findAllPublished(): Promise<Complaint[]> {
        return this.complaintModel.find({published: true}).exec();
    }

    findAll(): Promise<Complaint[]> {
        return this.complaintModel.find().exec();
    }

    findById(id: ObjectId): Promise<Complaint> {
        return this.complaintModel.findOne({_id: id}).exec();
    }
}
