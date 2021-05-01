import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { User, UserSchema } from './schemas/user.schema';
import { RolesGuard } from '../roles/roles.guard';
import { ComplaintsService } from 'src/complaints/complaints.service';
import { Complaint, ComplaintSchema } from 'src/complaints/schemas/complaints.schema';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Complaint.name, schema: ComplaintSchema }
    ]),
  ],
  providers: [UserService, RolesGuard, ComplaintsService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
