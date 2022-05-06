import { Controller, Delete, Get, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { RequestWithUser } from 'src/complaints/requestWithUser.interface';
import { Role } from 'src/roles/role.enum';

import { Roles } from 'src/roles/roles.decorator';
import JwtAuthGuard from 'src/auth/jwtAuth.guard';
import { RolesGuard } from 'src/roles/roles.guard';

import { DocumentsService } from './documents.service';

import { config } from '../config';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('documents')
@Controller('documents')
export class DocumentsController {

    SERVER_URL: string = config.ngrokUrl;
    constructor(
        private documentsService: DocumentsService,
    ) {}

    @Post('add')
    @Roles(Role.Doctor)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './documents',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                return cb(null, `${randomName}${extname(file.originalname)}`);
            }
        }),
        limits: {
            fieldSize: 1000000000,
        },
    }))
    uploadDocument(@Req() request: RequestWithUser, @UploadedFile() file) {
        const {user} = request;
        return this.documentsService.create(user, `${this.SERVER_URL}/${file.path}`, file.originalname);
    }

    @Get('get/:document_id')
    @UseGuards(JwtAuthGuard)
    async getDoctorDocuments(@Res() res: Response, @Param() {document_id}) {
        const documents = await this.documentsService.get(document_id);
        return res.sendFile(documents.path.split('documents/')[1], {root: 'documents'});
    }

    @Get(':doctor_id')
    @UseGuards(JwtAuthGuard)
    async getDocumentsList(@Param() {doctor_id}) {
        return await this.documentsService.getByUserId(doctor_id);
    }

    @Delete(':document_id')
    @Roles(Role.Doctor)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async deleteDocument(@Req() req: RequestWithUser, @Param() {document_id}) {
        await this.documentsService.delete(document_id);
        const {user} = req;
        return await this.documentsService.getByUserId(user._id);
    }

}
