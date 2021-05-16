import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger, Req, UseGuards } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import JwtAuthGuard from '../auth/jwtAuth.guard';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { WsJwtGuard } from 'src/auth/ws.guard';
import { RequestWithUser } from 'src/complaints/requestWithUser.interface';
import { ChatroomService } from 'src/chatroom/chatroom.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    
    constructor(private authService: AuthService, private chatroomService: ChatroomService) {}

    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('ChatGateway');
    private interval = undefined;
    private users: string[] = [];

    afterInit() {
        this.logger.log('Init');
    }

    async handleConnection(client: Socket) {
        const user = await this.authService.verifyUser(client.handshake.headers.cookie.split('=')[1]);
        this.logger.log(`Client connected: ${user.email}`);

        if (this.users.indexOf(String(user._id)) === -1) {
            this.users.push(String(user._id));
        }
        console.log(this.server.listeners('connection'));

        this.server.emit('users', this.users);
    }

    async handleDisconnect(client: Socket) {
        const user = await this.authService.verifyUser(client.handshake.headers.cookie.split('=')[1]);
        this.logger.log(`Client disconnected: ${user.email}`);

        const userIndex = this.users.indexOf(String(user._id));

        if (userIndex > -1) {
            this.users = [
                ...this.users.slice(0, userIndex),
                ...this.users.slice(userIndex + 1),
            ];
        }

        this.server.emit('users', this.users);
    }

    @SubscribeMessage('message')
    @UseGuards(WsJwtGuard)
    async onMessage(client: Socket, payload: any) {
        this.logger.log(`Data received: ${payload}`);
        const user = await this.authService.verifyUser(client.handshake.headers.cookie.split('=')[1]);
        const message = await this.chatroomService.addMessage({
            message: payload.message,
            date: new Date().toISOString(),
            user: user,
        }, payload.room);
        return this.server.to(payload.room).emit('message', message);
    }

    @SubscribeMessage('join')
    @UseGuards(WsJwtGuard)
    async onJoin(client: Socket, room: string) {
        const user = await this.authService.verifyUser(client.handshake.headers.cookie.split('=')[1]);
        this.logger.log(`User: ${user.email} joined room: ${room}`);
        client.join(room);
        client.emit('joinedRoom', room);
    }

    @SubscribeMessage('leave')
    @UseGuards(WsJwtGuard)
    async onLeave(client: Socket, room: string) {
        const user = await this.authService.verifyUser(client.handshake.headers.cookie.split('=')[1]);
        this.logger.log(`User: ${user.email} left room: ${room}`);
        client.leave(room);
        client.emit('leftRoom', room);
    }
}
