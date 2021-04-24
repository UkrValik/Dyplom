import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesGuard } from 'src/roles/roles.guard';
import { ComplaintsController } from './complaints.controller';
import { ComplaintsService } from './complaints.service';
import { Complaint, ComplaintSchema } from './schemas/complaints.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Complaint.name, schema: ComplaintSchema }])],
  controllers: [ComplaintsController],
  providers: [ComplaintsService, RolesGuard]
})
export class ComplaintsModule {}
