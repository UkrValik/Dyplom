import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ComplaintsService } from 'src/complaints/complaints.service';
import { UserDocument } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { CreateChatroomDto } from './dto';
import { Chatroom, ChatroomDocument } from './schemas/chatroom.schema';
import { Message, MessageDocument } from './schemas/message.schema';

@Injectable()
export class ChatroomService {
    constructor(
        @InjectModel(Chatroom.name) private chatroomModel: Model<ChatroomDocument>,
        @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
        private userService: UserService,
        private complaintService: ComplaintsService
    ) {}

    create(createChatroomDto: CreateChatroomDto) {
        const createdChatroom = new this.chatroomModel(createChatroomDto);
        return createdChatroom.save();
    }

    async addMessage(message: Message, chat_id: string) {
        // const createdMessage = new this.messageModel(message);
        const chatroom = await this.findById(chat_id);
        chatroom.messages.push(message);
        await chatroom.save();
        return message;
    }

    async findByUser(user: UserDocument) {
        const chatrooms = await this.chatroomModel.find({users: {$in: [user]}}).exec();
        for (let chat in chatrooms) {
            for (let user in chatrooms[chat].users) {
                chatrooms[chat].users[user] = await this.userService.getById(chatrooms[chat].users[user]._id);
                if (chatrooms[chat].users[user].complaint) {
                    chatrooms[chat].users[user].complaint = await this.complaintService.findById(chatrooms[chat].users[user].complaint._id);
                }
            }
        }
        return chatrooms;
    }

    async findById(chat_id: string) {
        return await (await this.chatroomModel.findById(chat_id)).execPopulate();
    }
}
