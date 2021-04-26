import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto';
import { ComplaintsService } from 'src/complaints/complaints.service';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private complaintsService: ComplaintsService
        ) {}

    async getByEmail(email: string) {
        const user = await this.userModel.findOne({email: email});
        if (user) {
            return user;
        }
        throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
    }

    async createPatient(createUserDto: CreateUserDto) {
        const complaint = await this.complaintsService.create({published: false});
        let createdUser = new this.userModel({
            ...createUserDto,
            complaint: complaint,
        });
        return createdUser.save();
    }

    async createDoctor(createUserDto: CreateUserDto) {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }
}
