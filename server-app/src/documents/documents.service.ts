import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Documents, DocumentsDocument } from './schemas/documents.schema';

@Injectable()
export class DocumentsService {

    constructor(
        @InjectModel(Documents.name) private documentsModel: Model<DocumentsDocument>,
    ) {}

    async create(user: User, path: string, name: string) {
        const createdDocument = new this.documentsModel({user, path, name});
        return await createdDocument.save();
    }

    async delete(document_id: string) {
        return await this.documentsModel.deleteOne({_id: document_id});
    }

    async get(document_id: string) {
        return await this.documentsModel.findOne({_id: document_id});
    }

    async getByUserId(user_id: string) {
        return await this.documentsModel.find().populate('user', {_id: user_id});
    }

}
