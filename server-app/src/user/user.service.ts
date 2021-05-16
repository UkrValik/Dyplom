import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus   } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto, UpdateUserDataDto } from './dto';
import { ComplaintsService } from 'src/complaints/complaints.service';
import { Role } from 'src/roles/role.enum';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private complaintsService: ComplaintsService
        ) {}

    async getById(id: string) {
        const user = await this.userModel.findOne({_id: id});
        if (user) {
            return user;
        }
        throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
    }

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

    async updateUserDataById(updateUserDataDto: UpdateUserDataDto) {
        const user = await this.userModel.findOneAndUpdate({_id: updateUserDataDto._id}, {
            firstname: updateUserDataDto.firstname,
            lastname: updateUserDataDto.lastname,
        });
        user.password = undefined;
        return user;
    }

    async getActiveDoctors() {
        const activeDoctors = (await this.userModel.find({roles: [Role.Doctor]}).exec());
        activeDoctors.map(doctor => doctor.password = undefined);
        return activeDoctors;
    }

    async activateDoctor(doctor: UserDocument) {
        let newDoctor = doctor;
        if (doctor.firstname && doctor.lastname) {
            newDoctor = await this.userModel.findOneAndUpdate({_id: doctor._id}, {active: true});
        }
        return newDoctor;
    }

    async setAvatar(user_id: string, avatar: string) {
        const newUser = await this.userModel.findOneAndUpdate({_id: user_id}, {avatar: avatar});
        return newUser;
    }
}
